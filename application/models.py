from index import client, bcrypt
from datetime import datetime

""" Rough Schema
{
    email: String
    password: String # salted, hashed password
}
"""
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
class Comment():

    db_name = "peeredit"
    coll_name = "comment"

    @classmethod
    def create_new_comment(cls, comment):
        return client[cls.db_name][cls.coll_name].insert_one(comment)


""" Rough Schema
{
    _id: ObjectId(),
    hash: String,
    links: [
        {
            url: String,
            lastValidated: Date(),
            reporter: {
                _id: ObjectId()
                , email: String
            } 
        }
    ],
}
"""
class Article():

    db_name = "peeredit"
    coll_name = "article"

    @classmethod
    def index_new_article(cls, article):
        """ Index a new article, hash, and store """
        pass

    @classmethod
    def get_article_with_id(cls, idx):
        """ Get article by id """
        return client[cls.db_name][cls.coll_name].find_one({"_id": idx})








