from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, EmergencyType, ResponderTeam, 
    Vehicle, EmergencyReport, Notification
)


class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='userprofile.role', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'role', 'phone_number', 'is_active_duty', 'created_at']


class EmergencyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyType
        fields = '__all__'


class ResponderTeamSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ResponderTeam
        fields = ['id', 'team', 'name', 'contact', 'members', 'member_count', 'is_active', 'created_at']
    
    def get_member_count(self, obj):
        return obj.members.count()


class VehicleSerializer(serializers.ModelSerializer):
    team = ResponderTeamSerializer(read_only=True)
    team_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    
    class Meta:
        model = Vehicle
        fields = ['id', 'vehicle_type', 'license_plate', 'team', 'team_id', 'capacity', 
                 'is_active', 'current_location', 'created_at']


class EmergencyReportSerializer(serializers.ModelSerializer):
    emergency = EmergencyTypeSerializer(read_only=True)
    emergency_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    reporter = UserSerializer(read_only=True)
    assigned_teams = ResponderTeamSerializer(many=True, read_only=True)
    assigned_team_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = EmergencyReport
        fields = [
            'id', 'emergency', 'emergency_id', 'description', 'address', 
            'latitude', 'longitude', 'reporter', 'assigned_teams', 'assigned_team_ids',
            'status', 'priority', 'time_stamp', 'resolved_at', 'notes'
        ]
    
    def create(self, validated_data):
        assigned_team_ids = validated_data.pop('assigned_team_ids', [])
        emergency_report = EmergencyReport.objects.create(**validated_data)
        
        if assigned_team_ids:
            emergency_report.assigned_teams.set(assigned_team_ids)
        
        return emergency_report
    
    def update(self, instance, validated_data):
        assigned_team_ids = validated_data.pop('assigned_team_ids', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if assigned_team_ids is not None:
            instance.assigned_teams.set(assigned_team_ids)
        
        return instance


class NotificationSerializer(serializers.ModelSerializer):
    recipient = UserSerializer(read_only=True)
    related_incident = EmergencyReportSerializer(read_only=True)
    related_incident_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'title', 'message', 'notification_type', 'recipient', 
            'related_incident', 'related_incident_id', 'is_read', 'created_at'
        ]