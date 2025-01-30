from flask import Blueprint, request, jsonify


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from models import db, Parcel
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__)

@user_bp.route('/parcels', methods=['POST'])
@jwt_required()
def create_parcel():
    data = request.get_json()
    user_id = get_jwt_identity()['id']
    new_parcel = Parcel(
        user_id=user_id,
        pickup_location=data['pickup_location'],
        destination=data['destination'],
        weight=data['weight'],
        delivery_cost=data['delivery_cost'],
        present_location=data['pickup_location'],
        distance=data['distance'],
        journey_duration=data['journey_duration']
    )
    db.session.add(new_parcel)
    db.session.commit()
    return jsonify({'message': 'Parcel delivery order created successfully'}), 201


@user_bp.route('/parcels', methods=['GET'])
@jwt_required()
def get_parcels():
    user_id = get_jwt_identity()['id']
    parcels = Parcel.query.filter_by(user_id=user_id).all()
    return jsonify([parcel.serialize() for parcel in parcels]), 200



@user_bp.route('/parcels/<parcel_id>', methods=['DELETE'])
@jwt_required()
def cancel_parcel(parcel_id):
    user_id = get_jwt_identity()['id']
    parcel = Parcel.query.filter_by(id=parcel_id, user_id=user_id, status='pending').first()
    if parcel:
        db.session.delete(parcel)
        db.session.commit()
        return jsonify({'message': 'Parcel delivery order canceled successfully'}), 200
    return jsonify({'message': 'Parcel cannot be canceled'}), 400

@user_bp.route('/parcels/<parcel_id>', methods=['PUT'])
@jwt_required()
def update_parcel(parcel_id):
    data = request.get_json()
    user_id = get_jwt_identity()['id']
    parcel = Parcel.query.filter_by(id=parcel_id, user_id=user_id, status='pending').first()
    if parcel:
        parcel.destination = data['destination']
        db.session.commit()
        return jsonify({'message': 'Parcel destination updated successfully'}), 200
    return jsonify({'message': 'Parcel destination cannot be updated'}), 400


from models import db, User
@user_bp.route('/profile', methods=['GET']) 
@jwt_required()
def profile():
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user: 
     return jsonify({"msg": "User not found"}), 404 
    return jsonify({ "name": user.name, "email": user.email, "role": user.role }), 200