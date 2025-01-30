import pandas as pd
from app import app
from models import db, User, Parcel, Notification, AuditLog

with app.app_context():
    # Query data using SQLAlchemy
    users = User.query.all()
    parcels = Parcel.query.all()
    notifications = Notification.query.all()
    audit_logs = AuditLog.query.all()

    # Convert to DataFrame
    user_data = [{'User ID': user.id, 'Name': user.name, 'Email': user.email, 'Role': user.role, 'Created At': user.created_at} for user in users]
    parcel_data = [{'Parcel ID': parcel.id, 'User ID': parcel.user_id, 'Pickup': parcel.pickup_location, 'Destination': parcel.destination, 'Weight': parcel.weight, 'Delivery Cost': parcel.delivery_cost, 'Status': parcel.status, 'Present Location': parcel.present_location, 'Distance': parcel.distance, 'Journey Duration': parcel.journey_duration, 'Created At': parcel.created_at, 'Updated At': parcel.updated_at} for parcel in parcels]
    notification_data = [{'Notification ID': notification.id, 'Parcel ID': notification.parcel_id, 'User ID': notification.user_id, 'Message': notification.message, 'Status': notification.status, 'Created At': notification.created_at} for notification in notifications]
    audit_log_data = [{'AuditLog ID': audit_log.id, 'Parcel ID': audit_log.parcel_id, 'User ID': audit_log.user_id, 'Action': audit_log.action, 'Old Value': audit_log.old_value, 'New Value': audit_log.new_value, 'Created At': audit_log.created_at} for audit_log in audit_logs]

    # Display DataFrames
    user_df = pd.DataFrame(user_data)
    parcel_df = pd.DataFrame(parcel_data)
    notification_df = pd.DataFrame(notification_data)
    audit_log_df = pd.DataFrame(audit_log_data)

    print("Users:")
    print(user_df)
    print("\nParcels:")
    print(parcel_df)
    print("\nNotifications:")
    print(notification_df)
    print("\nAudit Logs:")
    print(audit_log_df)
