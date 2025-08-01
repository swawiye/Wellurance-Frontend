from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('DISPATCHER', 'Dispatcher'),
        ('RESPONDER', 'Responder'), 
        ('ADMIN', 'Admin'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='RESPONDER')
    phone_number = models.CharField(max_length=15, blank=True)
    is_active_duty = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"


class EmergencyType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    priority_level = models.IntegerField(default=1)  # 1-5, where 5 is highest
    
    def __str__(self):
        return self.name


class ResponderTeam(models.Model):
    TEAM_TYPES = [
        ('FIRE', 'Fire Department'),
        ('POLICE', 'Police Department'),
        ('MEDICAL', 'Medical/EMS'),
        ('RESCUE', 'Search and Rescue'),
        ('HAZMAT', 'Hazmat Team'),
    ]
    
    team = models.CharField(max_length=20, choices=TEAM_TYPES)
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name='teams', blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} ({self.team})"


class Vehicle(models.Model):
    VEHICLE_TYPES = [
        ('FIRE_TRUCK', 'Fire Truck'),
        ('AMBULANCE', 'Ambulance'),
        ('POLICE_CAR', 'Police Car'),
        ('RESCUE_VEHICLE', 'Rescue Vehicle'),
        ('HELICOPTER', 'Helicopter'),
        ('BOAT', 'Boat'),
    ]
    
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPES)
    license_plate = models.CharField(max_length=20, unique=True)
    team = models.ForeignKey(ResponderTeam, on_delete=models.SET_NULL, null=True, blank=True)
    capacity = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)
    current_location = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.vehicle_type} - {self.license_plate}"


class EmergencyReport(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ASSIGNED', 'Assigned'),
        ('IN_PROGRESS', 'In Progress'),
        ('RESOLVED', 'Resolved'),
        ('CANCELLED', 'Cancelled'),
    ]
    
    emergency = models.ForeignKey(EmergencyType, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    address = models.CharField(max_length=300)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    reporter = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='reported_emergencies')
    assigned_teams = models.ManyToManyField(ResponderTeam, blank=True, related_name='assigned_reports')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    priority = models.IntegerField(default=1)  # 1-5, where 5 is highest
    time_stamp = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-time_stamp']
    
    def __str__(self):
        return f"Emergency {self.id}: {self.emergency.name if self.emergency else 'Unknown'} at {self.address}"


class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('EMERGENCY_ALERT', 'Emergency Alert'),
        ('ASSIGNMENT', 'Team Assignment'),
        ('STATUS_UPDATE', 'Status Update'),
        ('SYSTEM', 'System Notification'),
    ]
    
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    related_incident = models.ForeignKey(EmergencyReport, on_delete=models.CASCADE, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Notification for {self.recipient.username}: {self.title}"
