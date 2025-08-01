from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from emergency_system.models import (
    UserProfile, EmergencyType, ResponderTeam, Vehicle, 
    EmergencyReport, Notification
)


class Command(BaseCommand):
    help = 'Populate the database with sample emergency data'

    def handle(self, *args, **options):
        self.stdout.write('Populating database with sample data...')
        
        # Create sample users
        dispatcher_user, created = User.objects.get_or_create(
            username='dispatcher1',
            defaults={
                'email': 'dispatcher@emergency.com',
                'first_name': 'John',
                'last_name': 'Dispatcher'
            }
        )
        if created:
            dispatcher_user.set_password('password123')
            dispatcher_user.save()
        
        UserProfile.objects.get_or_create(
            user=dispatcher_user,
            defaults={'role': 'DISPATCHER'}
        )
        
        responder_user, created = User.objects.get_or_create(
            username='responder1',
            defaults={
                'email': 'responder@emergency.com',
                'first_name': 'Jane',
                'last_name': 'Responder'
            }
        )
        if created:
            responder_user.set_password('password123')
            responder_user.save()
            
        UserProfile.objects.get_or_create(
            user=responder_user,
            defaults={'role': 'RESPONDER'}
        )

        # Create emergency types
        emergency_types = [
            ('Fire', 'Building or wildfire emergency', 5),
            ('Medical Emergency', 'Medical assistance required', 4),
            ('Car Accident', 'Vehicle collision', 3),
            ('Robbery', 'Theft or robbery in progress', 3),
            ('Natural Disaster', 'Earthquake, flood, etc.', 5),
        ]
        
        for name, desc, priority in emergency_types:
            EmergencyType.objects.get_or_create(
                name=name,
                defaults={'description': desc, 'priority_level': priority}
            )

        # Create responder teams
        teams_data = [
            ('FIRE', 'Fire Station 1', 'fire.station1@emergency.com'),
            ('MEDICAL', 'EMS Team Alpha', 'ems.alpha@emergency.com'),
            ('POLICE', 'Police Unit 5', 'police.unit5@emergency.com'),
            ('RESCUE', 'Search & Rescue Team', 'rescue@emergency.com'),
        ]
        
        teams = []
        for team_type, name, contact in teams_data:
            team, created = ResponderTeam.objects.get_or_create(
                team=team_type,
                name=name,
                defaults={'contact': contact}
            )
            teams.append(team)
            # Add responder to teams
            team.members.add(responder_user)

        # Create vehicles
        vehicles_data = [
            ('FIRE_TRUCK', 'FIRE-001', 0, 6),
            ('AMBULANCE', 'AMB-001', 1, 4),
            ('POLICE_CAR', 'POL-001', 2, 2),
            ('RESCUE_VEHICLE', 'RES-001', 3, 8),
        ]
        
        for vehicle_type, license_plate, team_idx, capacity in vehicles_data:
            Vehicle.objects.get_or_create(
                license_plate=license_plate,
                defaults={
                    'vehicle_type': vehicle_type,
                    'team': teams[team_idx],
                    'capacity': capacity,
                    'current_location': 'Station Base'
                }
            )

        # Create sample emergency reports
        fire_emergency = EmergencyType.objects.get(name='Fire')
        medical_emergency = EmergencyType.objects.get(name='Medical Emergency')
        
        reports_data = [
            (fire_emergency, 'House fire on Main Street', '123 Main Street', 'PENDING', 5),
            (medical_emergency, 'Heart attack victim', '456 Oak Avenue', 'IN_PROGRESS', 4),
            (fire_emergency, 'Kitchen fire in apartment', '789 Pine Road', 'RESOLVED', 3),
        ]
        
        for emergency, desc, address, status, priority in reports_data:
            EmergencyReport.objects.get_or_create(
                emergency=emergency,
                description=desc,
                address=address,
                defaults={
                    'reporter': dispatcher_user,
                    'status': status,
                    'priority': priority
                }
            )

        # Create sample notifications
        notifications_data = [
            ('New Emergency Alert', 'Fire reported on Main Street', 'EMERGENCY_ALERT'),
            ('Team Assignment', 'You have been assigned to incident #1', 'ASSIGNMENT'),
            ('Status Update', 'Emergency #2 status changed to IN_PROGRESS', 'STATUS_UPDATE'),
        ]
        
        for title, message, notif_type in notifications_data:
            Notification.objects.get_or_create(
                title=title,
                message=message,
                notification_type=notif_type,
                recipient=dispatcher_user,
                defaults={'is_read': False}
            )

        self.stdout.write(
            self.style.SUCCESS('Successfully populated database with sample data!')
        )
        self.stdout.write('Sample login credentials:')
        self.stdout.write('  Admin: admin / admin123')
        self.stdout.write('  Dispatcher: dispatcher1 / password123')
        self.stdout.write('  Responder: responder1 / password123')