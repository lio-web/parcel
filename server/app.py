from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS 
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) 
from models import db, User, Parcel, Notification, AuditLog
from views.auth_view import auth_bp, init_app
from views.user_view import user_bp
from views.admin_view import admin_bp
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')  

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
init_app(app)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(admin_bp, url_prefix='/admin')

# Add welcome message route
@app.route('/')
def welcome():
    return "Welcome to Deliveroo! Your trusted parcel delivery service."

# Add route to display users
@app.route('/users')
def get_users():
    users = User.query.all()
    users_list = [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]
    return {'users': users_list}

@app.route('/parcels')
def get_parcels():
    parcels = Parcel.query.all()
    parcels_list = [parcel.serialize() for parcel in parcels]
    return {'parcels': parcels_list}

# Add route to display notifications
@app.route('/notifications')
def get_notifications():
    notifications = Notification.query.all()
    notifications_list = [{'id': notification.id, 'parcel_id': notification.parcel_id, 'user_id': notification.user_id, 'message': notification.message, 'status': notification.status, 'created_at': notification.created_at} for notification in notifications]
    return {'notifications': notifications_list}

# Add route to display audit logs
@app.route('/audit_logs')
def get_audit_logs():
    audit_logs = AuditLog.query.all()
    audit_logs_list = [{'id': audit_log.id, 'parcel_id': audit_log.parcel_id, 'user_id': audit_log.user_id, 'action': audit_log.action, 'old_value': audit_log.old_value, 'new_value': audit_log.new_value, 'created_at': audit_log.created_at} for audit_log in audit_logs]
    return {'audit_logs': audit_logs_list}

if __name__ == '__main__':
    app.run(debug=True)
