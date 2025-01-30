from models import db, User, Parcel, Notification, AuditLog
from app import app
from flask_bcrypt import Bcrypt
import uuid
from datetime import datetime

bcrypt = Bcrypt()

# Sample users data
users = [
    {
        'id': str(uuid.uuid4()),
        'name': 'John Doe',
        'email': 'john.doe@example.com',
        'password': 'password1',
        'role': 'user'
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Jane Smith',
        'email': 'jane.smith@example.com',
        'password': 'password2',
        'role': 'user'
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Steve Kelo',
        'email': 'steve.kelo@example.com',
        'password': 'password3',
        'role': 'admin'
    }
]

# Sample parcels data
parcels = [
    {
        'id': str(uuid.uuid4()),
        'user_id': users[0]['id'],
        'pickup_location': 'Location A',
        'destination': 'Location B',
        'weight': 2.5,
        'delivery_cost': 300.0,
        'status': 'pending',
        'present_location': 'Location A',
        'distance': 15.0,
        'journey_duration': '30 minutes'
    },
    {
        'id': str(uuid.uuid4()),
        'user_id': users[1]['id'],
        'pickup_location': 'Location C',
        'destination': 'Location D',
        'weight': 1.2,
        'delivery_cost': 200.0,
        'status': 'pending',
        'present_location': 'Location C',
        'distance': 10.0,
        'journey_duration': '20 minutes'
    },
    {
        'id': str(uuid.uuid4()),
        'user_id': users[2]['id'],
        'pickup_location': 'Location E',
        'destination': 'Location F',
        'weight': 3.0,
        'delivery_cost': 400.0,
        'status': 'pending',
        'present_location': 'Location E',
        'distance': 20.0,
        'journey_duration': '40 minutes'
    }
]

# Sample notifications data
notifications = [
    {
        'id': str(uuid.uuid4()),
        'parcel_id': parcels[0]['id'],
        'user_id': users[0]['id'],
        'message': 'Your parcel is on its way!',
        'status': 'sent'
    },
    {
        'id': str(uuid.uuid4()),
        'parcel_id': parcels[1]['id'],
        'user_id': users[1]['id'],
        'message': 'Your parcel has been delivered!',
        'status': 'sent'
    },
    {
        'id': str(uuid.uuid4()),
        'parcel_id': parcels[2]['id'],
        'user_id': users[2]['id'],
        'message': 'Your parcel is being prepared for shipment!',
        'status': 'sent'
    }
]

# Sample audit logs data
audit_logs = [
    {
        'id': str(uuid.uuid4()),
        'parcel_id': parcels[0]['id'],
        'user_id': users[0]['id'],
        'action': 'created',
        'old_value': '',
        'new_value': 'Parcel created'
    },
    {
        'id': str(uuid.uuid4()),
        'parcel_id': parcels[1]['id'],
        'user_id': users[1]['id'],
        'action': 'created',
        'old_value': '',
        'new_value': 'Parcel created'
    },
    {
        'id': str(uuid.uuid4()),
        'parcel_id': parcels[2]['id'],
        'user_id': users[2]['id'],
        'action': 'created',
        'old_value': '',
        'new_value': 'Parcel created'
    }
]

with app.app_context():
    db.drop_all()
    db.create_all()

    # Add users to the database
    for user_data in users:
        hashed_password = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
        user = User(id=user_data['id'], name=user_data['name'], email=user_data['email'], password_hash=hashed_password, role=user_data['role'])
        db.session.add(user)

    db.session.commit()  # Commit users to the database first

    # Add parcels to the database
    for parcel_data in parcels:
        parcel = Parcel(
            id=parcel_data['id'],
            user_id=parcel_data['user_id'],
            pickup_location=parcel_data['pickup_location'],
            destination=parcel_data['destination'],
            weight=parcel_data['weight'],
            delivery_cost=parcel_data['delivery_cost'],
            status=parcel_data['status'],
            present_location=parcel_data['present_location'],
            distance=parcel_data['distance'],
            journey_duration=parcel_data['journey_duration']
        )
        db.session.add(parcel)

    db.session.commit()

    # Add notifications to the database
    for notification_data in notifications:
        notification = Notification(
            id=notification_data['id'],
            parcel_id=notification_data['parcel_id'],
            user_id=notification_data['user_id'],
            message=notification_data['message'],
            status=notification_data['status']
        )
        db.session.add(notification)

    db.session.commit()

    # Add audit logs to the database
    for audit_log_data in audit_logs:
        audit_log = AuditLog(
            id=audit_log_data['id'],
            parcel_id=audit_log_data['parcel_id'],
            user_id=audit_log_data['user_id'],
            action=audit_log_data['action'],
            old_value=audit_log_data['old_value'],
            new_value=audit_log_data['new_value']
        )
        db.session.add(audit_log)

    db.session.commit()

    print('Database seeded successfully!')
