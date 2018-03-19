from index import db, bcrypt
from datetime import datetime

from sqlalchemy.sql import func
import sqlalchemy.dialects.postgresql as pgtypes

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None

class DataSource(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    ref = db.Column(db.String())
    name = db.Column(db.String())
    desc = db.Column(db.String())

class Article(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    source_id = db.Column(db.Integer())
    download_ref = db.Column(db.String())
    doi = db.Column(db.String())
    encoding_type = db.Column(db.String())

class Comment(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    article_id = db.Column(db.Integer())
    slug_hash = db.Column(db.String(255))
    content_text = db.Column(db.String())
    position_data = db.Column(pgtypes.JSON())
    timestamp = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    num_thumbs_up = db.Column(db.Integer(), default=0)
    num_thumbs_down = db.Column(db.Integer(), default=0)

    def __init__(self, article_id, slug_hash, content_text, position_data):
        self.article_id = article_id
        self.slug_hash = slug_hash
        self.content_text = content_text
        self.position_data = position_data

class Rating(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer())
    article_id = db.Column(db.Integer())
    rating_type = db.Column(db.Integer())

    def __init__(self, user_id, rating_type):
        self.user_id = user_id
        self.rating_type = rating_type

    @staticmethod
    def get_ratings_for_user_on_article(user_id, article_id):
        ratings = Rating.query.filter_by(user_id=user_id)\
                              .filter_by(article_id=article_id)\
                              .all()
        return ratings
