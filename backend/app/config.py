import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://dbadmin:jerome9911@localhost:5432/wasichanaV2')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')
    STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY') 
    # David you can choose to use stripe or whichever