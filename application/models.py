from index import client, bcrypt
from datetime import datetime

from sqlalchemy.sql import func
import sqlalchemy.dialects.postgresql as pgtypes


class User():

    db_name = "peeredit"
    coll_name = "user"

    @classmethod
    def create_new_user(cls, userobj):
        """ Create new user, raises exception on failure """
        userobj['password'] = bcrypt.generate_password_hash(userobj['password'])
        return client[cls.db_name][cls.coll_name].insert_one(userobj)

    @classmethod
    def hashed_password(cls, password):
        return bcrypt.generate_password_hash(password)

    @classmethod
    def get_user_with_email(cls, email):
        return client[cls.db_name][cls.coll_name].find_one({
                'email': email
            })

    @classmethod
    def get_user_with_email_and_password(cls, email, password):
        user = cls.get_user_with_email(email)

        if user and bcrypt.check_password_hash(user['password'], password):
            del user["password"]
            return user
        else:
            return None

"""
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
"""