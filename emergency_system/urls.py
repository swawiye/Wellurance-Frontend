from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LoginView, RegisterView, EmergencyReportViewSet, ResponderTeamViewSet,
    VehicleViewSet, NotificationViewSet, EmergencyTypeViewSet, UserProfileViewSet
)

router = DefaultRouter()
router.register(r'reports', EmergencyReportViewSet)
router.register(r'teams', ResponderTeamViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'emergency-types', EmergencyTypeViewSet)
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]