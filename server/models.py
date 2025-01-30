from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(10), nullable=False, default='user')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    parcels = db.relationship('Parcel', backref='user', lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True)
    audit_logs = db.relationship('AuditLog', backref='user', lazy=True)

class Parcel(db.Model):
    __tablename__ = 'parcel'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    pickup_location = db.Column(db.String(200), nullable=False)
    destination = db.Column(db.String(200), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    delivery_cost = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    present_location = db.Column(db.String(200), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    journey_duration = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    notifications = db.relationship('Notification', backref='parcel', lazy=True)
    audit_logs = db.relationship('AuditLog', backref='parcel', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'pickup_location': self.pickup_location,
            'destination': self.destination,
            'weight': self.weight,
            'delivery_cost': self.delivery_cost,
            'status': self.status,
            'present_location': self.present_location,
            'distance': self.distance,
            'journey_duration': self.journey_duration,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

class Notification(db.Model):
    __tablename__ = 'notification'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    parcel_id = db.Column(db.String(36), db.ForeignKey('parcel.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class AuditLog(db.Model):
    __tablename__ = 'audit_log'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    parcel_id = db.Column(db.String(36), db.ForeignKey('parcel.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    action = db.Column(db.String(50), nullable=False)
    old_value = db.Column(db.Text, nullable=False)
    new_value = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
