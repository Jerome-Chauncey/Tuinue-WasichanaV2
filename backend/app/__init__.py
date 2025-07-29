from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from .config import Config

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Updated CORS configuration
    CORS(app, resources={r"/api/*": {
    "origins": [
        "http://localhost:5173",   
        "http://localhost:5000",   
        "http://localhost:10000"  
    ],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}})

    from .routes import main
    app.register_blueprint(main, url_prefix='/api')

    @app.after_request
    def after_request(response):
        if request.method == 'OPTIONS':
            response.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin', '*')
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            response.headers['Access-Control-Max-Age'] = '86400'  # Cache preflight for 24 hours
            return response
        response.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin', '*')
        return response

    return app