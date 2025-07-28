from app import create_app, db
from app.models import Charity

app = create_app()

with app.app_context():
    charity = Charity(
        name="Tuinue Wasichana",
        description="Providing sanitary products and clean water to girls in sub-Saharan Africa."
    )
    db.session.add(charity)
    db.session.commit()
    print(f"Added charity with ID: {charity.id}")