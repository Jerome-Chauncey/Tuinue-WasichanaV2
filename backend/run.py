from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)

# Configure CORS to allow localhost during development
cors = CORS(app, resources={r"/charities": {"origins": "http://localhost:10000"}})

@app.route('/charities', methods=['GET', 'OPTIONS'])
def get_charities():
    if request.method == 'OPTIONS':
        return '', 200  # Respond to preflight with 200 OK and CORS headers
    # Simulate charity data (replace with actual database query)
    charities = [{"id": 1, "name": "Charity A", "description": "Helping girls"}, {"id": 2, "name": "Charity B", "description": "Education support"}]
    return jsonify(charities)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)