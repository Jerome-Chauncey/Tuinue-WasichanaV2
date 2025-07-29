from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from . import db
from .models import User, Charity, Donation, Story
from datetime import datetime
import uuid
import bcrypt

main = Blueprint('main', __name__)

@main.route('/charities', methods=['GET', 'OPTIONS'])
def get_charities():
    if request.method == 'OPTIONS':
        return '', 200  
    charities = Charity.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'description': c.description} for c in charities]), 200

@main.route('/signup', methods=['POST'])  
def signup():  
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'donor')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = User(email=email, password=hashed_password.decode('utf-8'), role=role)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

from datetime import timedelta
from flask import jsonify, request
from flask_jwt_extended import create_access_token

@main.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
        
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({
            'success': False,
            'message': 'Invalid credentials',
            'redirect': '/login'
        }), 401
    
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({
            'success': False,
            'message': 'Invalid credentials',
            'redirect': '/login'
        }), 401

    access_token = create_access_token(
        identity={
            'id': user.id,
            'email': user.email,
            'role': user.role
        },
        additional_claims={
            'iss': 'your-app-name',
            'aud': 'your-app-client'
        }
    )
    
    return jsonify({
        'success': True,
        'access_token': access_token,
        'token': access_token,  # For backward compatibility
        'role': user.role,
        'redirect': f'/{user.role}-dashboard',
        'message': 'Login successful'
    }), 200

@main.route('/donate', methods=['POST'])
@jwt_required()
def donate():
    data = request.get_json()
    user_id = get_jwt_identity()
    charity_id = data.get('charity_id')
    amount = data.get('amount')
    is_anonymous = data.get('is_anonymous', False)
    is_recurring = data.get('is_recurring', False)
    frequency = data.get('frequency', None)

    if not charity_id or not amount:
        return jsonify({'message': 'charity_id and amount are required'}), 400

    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({'message': 'Charity not found'}), 404

    transaction_id = str(uuid.uuid4())
    donation = Donation(
        user_id=user_id,
        charity_id=charity_id,
        amount=amount,
        is_anonymous=is_anonymous,
        is_recurring=is_recurring,
        frequency=frequency,
        created_at=datetime.utcnow()
    )
    db.session.add(donation)
    db.session.commit()

    return jsonify({
        'message': 'Donation processed successfully',
        'transaction_id': transaction_id,
        'donation_id': donation.id
    }), 200

@main.route('/stories', methods=['GET', 'POST'])
@jwt_required()
def stories():
    if request.method == 'GET':
        stories = Story.query.all()
        return jsonify([{'id': s.id, 'charity_id': s.charity_id, 'title': s.title, 'content': s.content} for s in stories]), 200
    elif request.method == 'POST':
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.role != 'charity':
            return jsonify({'message': 'Unauthorized'}), 403

        data = request.get_json()
        story = Story(
            charity_id=data.get('charity_id'),
            title=data.get('title'),
            content=data.get('content'),
            created_at=datetime.utcnow()
        )
        db.session.add(story)
        db.session.commit()
        return jsonify({'message': 'Story added successfully'}), 201


@main.route('/test-users')
def test_users():
    from app.models import User
    users = User.query.all()
    return jsonify([{'email': u.email, 'role': u.role} for u in users])