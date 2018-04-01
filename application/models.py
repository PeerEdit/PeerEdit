from index import client, bcrypt
from datetime import datetime

from sqlalchemy.sql import func
import sqlalchemy.dialects.postgresql as pgtypes


class User():

    db_name = "peeredit"
    coll_name = "user"

    """ Rough Schema
    {
        email: String
        password: String # salted, hashed password
    }
    """

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

class Comment():

    db_name = "peeredit"
    coll_name = "comment"

    """ Rough Schema
    {
        _id: String, # slug extension
        articleId: ObjectId(),
        content: {
            text: String
        },
        position {
            boundingRect: {
                x1: Number,
                y1: Number,
                x2: Number,
                y2: Number,
                width: Number,
                height: Number
            },
            rects: [ 
                {
                    x1: Number,
                    y1: Number,
                    x2: Number,
                    y2: Number,
                    width: Number,
                    height: Number
                } 
            ],
            pageNumber: Number
        },
        comment: {
            text: String
        }
    }
    """

    @classmethod
    def create_new_comment(cls, comment):
        return client[cls.db_name][cls.coll_name].insert_one(comment)

