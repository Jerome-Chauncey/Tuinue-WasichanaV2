from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)

# Configure CORS to allow requests from the Vite development server and handle preflight
CORS(app, resources={
    r"/api/*": {
        "origins": "http://localhost:5173",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# In-memory storage (replace with database in production)
users = {}
donations = [
    {"id": 1, "donor_id": 1, "charity_id": 1, "amount": 50.0, "date": "2025-07-01", "status": "completed"},
    {"id": 2, "donor_id": 1, "charity_id": 2, "amount": 30.0, "date": "2025-07-15", "status": "pending"}
]
charities = [
    {"id": 1, "name": "Charity A", "email": "a@charity.com", "description": "Helping girls", "status": "active", "created_at": "2025-01-01"},
    {"id": 2, "name": "Charity B", "email": "b@charity.com", "description": "Education support", "status": "pending", "created_at": "2025-02-01"}
]

@app.route('/api/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        return '', 200  # Respond to preflight with 200 OK
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # 'donor', 'charity', or 'admin'
    if email and password and role in ['donor', 'charity', 'admin']:
        if email not in users:
            users[email] = {"password": password, "role": role, "id": len(users) + 1}
            return jsonify({"message": "Signup successful", "redirect": "/login"}), 201
    return jsonify({"error": "Invalid signup"}), 400

@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if email in users and users[email]["password"] == password:
        token = f"token_{email}_{datetime.now().timestamp()}"
        return jsonify({"token": token, "role": users[email]["role"], "redirect": f"/{users[email]['role']}-dashboard"}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/donor-dashboard/<int:user_id>', methods=['GET'])
def donor_dashboard(user_id):
    user_donations = [d for d in donations if d['donor_id'] == user_id]
    return jsonify({"donations": user_donations})

@app.route('/api/charity-dashboard/<int:user_id>', methods=['GET'])
def charity_dashboard(user_id):
    user_charity = next((c for c in charities if c['id'] == user_id), None)
    return jsonify({"charity": user_charity})

@app.route('/api/admin-dashboard', methods=['GET'])
def admin_dashboard():
    return jsonify({"donations": donations, "charities": charities, "users": users})

@app.route('/charities', methods=['GET', 'OPTIONS'])
def get_charities():
    if request.method == 'OPTIONS':
        return '', 200
    return jsonify(charities)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)