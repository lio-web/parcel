from flask import Blueprint, request, jsonify

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from models import db, Parcel, User
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
import os

admin_bp = Blueprint('admin', __name__)

def send_email(to_email, subject, content):
    url = "https://api.brevo.com/v3/smtp/email"
    payload = {
        "sender": {"name": "deliveroo", "email": "lionardmuhati58@gmail.com"},
        "to": [{"email": to_email}],
        "subject": subject,
        "htmlContent": content
    }
    headers = {
        "accept": "application/json",
        "api-key": os.environ.get('BREVO_API_KEY'),
        "content-type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    print(response.status_code)

@admin_bp.route('/parcels/<parcel_id>/status', methods=['PUT'])
@jwt_required()
def update_parcel_status(parcel_id):
    data = request.get_json()
    parcel = Parcel.query.filter_by(id=parcel_id).first()
    if parcel:
        parcel.status = data['status']
        db.session.commit()
        # Send email notification
        user = User.query.filter_by(id=parcel.user_id).first()
        send_email(user.email, 'Parcel Status Updated', f'Your parcel status has been updated to {data["status"]}.')
        return jsonify({'message': 'Parcel status updated successfully'}), 200
    return jsonify({'message': 'Parcel not found'}), 404

@admin_bp.route('/parcels/<parcel_id>/location', methods=['PUT'])
@jwt_required()
def update_parcel_location(parcel_id):
    data = request.get_json()
    parcel = Parcel.query.filter_by(id=parcel_id).first()
    if parcel:
        parcel.present_location = data['present_location']
        db.session.commit()
        # Send email notification
        user = User.query.filter_by(id=parcel.user_id).first()
        send_email(user.email, 'Parcel Location Updated', f'Your parcel location has been updated to {data["present_location"]}.')
        return jsonify({'message': 'Parcel location updated successfully'}), 200
    return jsonify({'message': 'Parcel not found'}), 404

@admin_bp.route('/parcels', methods=['GET'])
def get_parcels():
    try:
        parcels = Parcel.query.all()
        parcels_list = [parcel.serialize() for parcel in parcels]
        return jsonify(parcels_list), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
