from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)

# Explicitly configure CORS for the /charities endpoint
cors = CORS(app, resources={r"/charities": {"origins": "http://localhost:10000", "methods": ["GET", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

@app.route('/charities', methods=['GET', 'OPTIONS'])
def get_charities():
    if request.method == 'OPTIONS':
        return '', 200  # Ensure preflight returns 200 OK with CORS headers
    # Simulate charity data (replace with actual logic)
    charities = [{"id": 1, "name": "Charity A", "description": "Helping girls"}, {"id": 2, "name": "Charity B", "description": "Education support"}]
    return jsonify(charities)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)