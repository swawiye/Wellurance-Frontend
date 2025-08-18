from django.contrib import admin
from .models import (
    UserProfile, EmergencyType, ResponderTeam, 
    Vehicle, EmergencyReport, Notification
)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'is_active_duty', 'created_at']
    list_filter = ['role', 'is_active_duty']
    search_fields = ['user__username', 'user__email']


@admin.register(EmergencyType)
class EmergencyTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'priority_level']
    list_filter = ['priority_level']
    search_fields = ['name']


@admin.register(ResponderTeam)
class ResponderTeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'team', 'contact', 'is_active', 'created_at']
    list_filter = ['team', 'is_active']
    search_fields = ['name', 'contact']
    filter_horizontal = ['members']


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ['license_plate', 'vehicle_type', 'team', 'capacity', 'is_active']
    list_filter = ['vehicle_type', 'is_active']
    search_fields = ['license_plate', 'team__name']


@admin.register(EmergencyReport)
class EmergencyReportAdmin(admin.ModelAdmin):
    list_display = ['id', 'emergency', 'address', 'status', 'priority', 'reporter', 'time_stamp']
    list_filter = ['status', 'priority', 'emergency__name', 'time_stamp']
    search_fields = ['address', 'description', 'reporter__username']
    date_hierarchy = 'time_stamp'
    filter_horizontal = ['assigned_teams']


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'recipient', 'notification_type', 'is_read', 'created_at']
    list_filter = ['notification_type', 'is_read', 'created_at']
    search_fields = ['title', 'message', 'recipient__username']
    date_hierarchy = 'created_at'
