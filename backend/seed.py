# seed.py
from app import create_app, db
from app.models import User, Charity, Donation, Story
import bcrypt
from datetime import datetime, timedelta
import random

def seed_database():
    app = create_app()
    with app.app_context():
        print("Clearing existing data...")
        db.session.query(Story).delete()
        db.session.query(Donation).delete()
        db.session.query(Charity).delete()
        db.session.query(User).delete()
        db.session.commit()

        print("Seeding users...")
        users = [
            User(
                email='donor1@example.com',
                password=bcrypt.hashpw('donorpass1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='donor'
            ),
            User(
                email='donor2@example.com',
                password=bcrypt.hashpw('donorpass2'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='donor'
            ),
            User(
                email='charity1@example.com',
                password=bcrypt.hashpw('charitypass1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='charity'
            ),
            User(
                email='charity2@example.com',
                password=bcrypt.hashpw('charitypass2'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='charity'
            ),
            User(
                email='admin@example.com',
                password=bcrypt.hashpw('adminpass'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='admin'
            )
        ]
        db.session.add_all(users)
        db.session.commit()

        print("Seeding charities...")
        charities = [
            Charity(
                name='Education for All',
                description='Providing school supplies and scholarships to underprivileged children'
            ),
            Charity(
                name='Clean Water Initiative',
                description='Building wells and water purification systems in developing areas'
            ),
            Charity(
                name='Animal Rescue Foundation',
                description='Rescuing and rehabilitating abandoned and abused animals'
            )
        ]
        db.session.add_all(charities)
        db.session.commit()

        print("Seeding donations...")
        donations = []
        for i in range(20):
            donations.append(Donation(
                user_id=random.choice([users[0].id, users[1].id]),
                charity_id=random.choice([charities[0].id, charities[1].id, charities[2].id]),
                amount=round(random.uniform(10, 500), 2),
                is_anonymous=random.choice([True, False]),
                is_recurring=random.choice([True, False]),
                frequency=random.choice(['monthly', 'quarterly', None]),
                created_at=datetime.utcnow() - timedelta(days=random.randint(1, 365))
            ))
        db.session.add_all(donations)
        db.session.commit()

        print("Seeding stories...")
        stories = [
            Story(
                charity_id=charities[0].id,
                title='First Scholarship Awarded',
                content='We are proud to announce our first full scholarship recipient...',
                created_at=datetime.utcnow() - timedelta(days=30)
            ),
            Story(
                charity_id=charities[0].id,
                title='New School Supplies Delivered',
                content='Thanks to your donations, we delivered 500 backpacks...',
                created_at=datetime.utcnow() - timedelta(days=15)
            ),
            Story(
                charity_id=charities[1].id,
                title='First Well Completed',
                content='Our team has successfully installed the first water well...',
                created_at=datetime.utcnow() - timedelta(days=45)
            ),
            Story(
                charity_id=charities[2].id,
                title='Rescue Mission Success',
                content='We rescued 15 dogs from an abandoned property...',
                created_at=datetime.utcnow() - timedelta(days=10)
            )
        ]
        db.session.add_all(stories)
        db.session.commit()

        print("Database seeded successfully!")
        print(f"Created: {len(users)} users, {len(charities)} charities, {len(donations)} donations, {len(stories)} stories")

if __name__ == '__main__':
    seed_database()