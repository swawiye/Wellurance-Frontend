from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .models import (
    UserProfile, EmergencyType, ResponderTeam, 
    Vehicle, EmergencyReport, Notification
)
from .serializers import (
    UserSerializer, UserProfileSerializer, EmergencyTypeSerializer,
    ResponderTeamSerializer, VehicleSerializer, EmergencyReportSerializer,
    NotificationSerializer
)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response(
                {'error': 'Username and password required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            # Get or create user profile
            profile, created = UserProfile.objects.get_or_create(user=user)
            
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': profile.role
                }
            })
        else:
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        role = request.data.get('role', 'RESPONDER')
        
        if not username or not password:
            return Response(
                {'error': 'Username and password required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Username already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = User.objects.create_user(
            username=username, 
            password=password, 
            email=email
        )
        
        # Create user profile
        UserProfile.objects.create(user=user, role=role)
        
        # Create token
        token = Token.objects.create(user=user)
        
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': role
            }
        }, status=status.HTTP_201_CREATED)


class EmergencyReportViewSet(viewsets.ModelViewSet):
    queryset = EmergencyReport.objects.all()
    serializer_class = EmergencyReportSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)
    
    def get_queryset(self):
        queryset = EmergencyReport.objects.all()
        # Allow filtering by status
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        report = self.get_object()
        new_status = request.data.get('status')
        
        if new_status in dict(EmergencyReport.STATUS_CHOICES):
            report.status = new_status
            if new_status == 'RESOLVED':
                from django.utils import timezone
                report.resolved_at = timezone.now()
            report.save()
            
            return Response(self.get_serializer(report).data)
        else:
            return Response(
                {'error': 'Invalid status'}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class ResponderTeamViewSet(viewsets.ModelViewSet):
    queryset = ResponderTeam.objects.all()
    serializer_class = ResponderTeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        team = self.get_object()
        user_id = request.data.get('user_id')
        
        try:
            user = User.objects.get(id=user_id)
            team.members.add(user)
            return Response({'status': 'member added'})
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=True, methods=['delete'])
    def remove_member(self, request, pk=None):
        team = self.get_object()
        user_id = request.data.get('user_id')
        
        try:
            user = User.objects.get(id=user_id)
            team.members.remove(user)
            return Response({'status': 'member removed'})
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Vehicle.objects.all()
        # Allow filtering by team
        team_id = self.request.query_params.get('team', None)
        if team_id:
            queryset = queryset.filter(team_id=team_id)
        
        # Allow filtering by active status
        is_active = self.request.query_params.get('active', None)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        
        return queryset


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own notifications
        return Notification.objects.filter(recipient=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(recipient=self.request.user)
    
    @action(detail=True, methods=['patch'])
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response(self.get_serializer(notification).data)
    
    @action(detail=False, methods=['patch'])
    def mark_all_read(self, request):
        notifications = self.get_queryset().filter(is_read=False)
        notifications.update(is_read=True)
        return Response({'status': 'all notifications marked as read'})


class EmergencyTypeViewSet(viewsets.ModelViewSet):
    queryset = EmergencyType.objects.all()
    serializer_class = EmergencyTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            # Create profile if it doesn't exist
            profile = UserProfile.objects.create(user=request.user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
