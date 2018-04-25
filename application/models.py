from index import client, bcrypt
from datetime import datetime

import flask

import urllib
from urllib.request import urlopen
from xxhash import xxh64
from filetype import filetype
import traceback

import bson

import sys

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
    def add_new_comment(cls, comment):
        return client[cls.db_name][cls.coll_name].insert_one(
            comment
        )

    @classmethod
    def add_new_comment_reply(cls, comment, reply_to_id):
        return client[cls.db_name][cls.coll_name].update_one(
            {"_id": bson.objectid.ObjectId(reply_to_id)},
            {"$addToSet" : {"replies" : comment}}
        )

    @classmethod
    def get_all_comments_for_resource(cls, resource_id):
        return list(
            client[cls.db_name][cls.coll_name].find({
                    'resourceId': resource_id
                })
        )

""" Rough Schema
{
    _id: int, # hash of binary data
    kExt: String,
    kMIME: String,
    links: [
            url: String,
            lastValidated: Date(),
            reporter: {
                _id: ObjectId()
                , email: String
            } 
        }
    ]
}
"""
class Resource():

    db_name = "peeredit"
    coll_name = "resource"

    # way to bound maximum work done during hashing
    # will only parse first ~2MB of data in file.
    max_chunks_for_hash = 1

    # TODO: add error handling
    @classmethod
    def store_file_with_id(cls, url, fid):
        try:
            urllib.request.urlretrieve(url, 'application/resources/{}'.format(fid))
        except Exception as e:
            print(e)
            raise

    @classmethod
    def get_file_with_id(cls, fid):
        return flask.send_from_directory('application/resources/', fid)

    @classmethod 
    def hashurl(cls, url):
        # hash binary
        i = 0
        x = xxh64()
        CHUNK = 64 * 1024
        with urlopen(url) as f:
            while not f.closed:# and i < cls.max_chunks_for_hash:
                i = i + 1
                chunk = f.read(CHUNK)
                if chunk == b'':
                    break
                x.update(chunk)

        # force representation by 64 bit signed int.
        # this halves the power of the hashing function
        return x.hexdigest()

    # see https://pypi.python.org/pypi/filetype#file-header
    # for rationale behind requiring only first 261 bytes
    @classmethod
    def get_filetype(cls, url):
        with urlopen(url) as f:
            return filetype.guess(f.read(261))

    # TODO: add network exception handling / retry logic
    @classmethod
    def index_new_resource(cls, resource, reporter):
        if not "id" in reporter:
            raise ValueError("no id passed to index_new_resource")
        if not "email" in reporter:
            raise ValueError("no email passed to index_new_resource")

        """ Index a new resource, hash, and store """
        hashval = cls.hashurl(resource['url'])
        guessed_type = cls.get_filetype(resource['url'])

        cls.store_file_with_id(resource['url'], hashval);

        # persist data
        with client.start_session(causal_consistency=True) as session:
            try:
                doc = client[cls.db_name][cls.coll_name].find_one({"_id": hashval})
                if not doc:

                    obj = {
                        "_id": hashval,
                        "links": [
                            {
                                "url": resource["url"]
                                , "lastValidated": datetime.now()
                                , "reporter": {
                                    "id": reporter["id"]
                                    , "email": reporter["email"]
                                }
                            }
                        ]
                    }
                    if guessed_type is not None:
                        obj['kExt'] = guessed_type.extension
                        obj['kMIME'] = guessed_type.mime
                    res = client[cls.db_name][cls.coll_name].insert_one(obj)

                elif not resource["url"] in [x["url"] for x in doc["links"]]:
                    res = client[cls.db_name][cls.coll_name].update_one(
                        {"_id": hashval}
                        , {"$addToSet" : {"links": {
                            "url": resource["url"]
                            , "lastValidated": datetime.now()
                            , "reporter": {
                                "id": reporter["id"]
                                , "email": reporter["email"]
                            }
                        }}}
                    )
                else: # if link has already been reported, do nothing.
                    pass
            except:
                print("Unexpected error:", sys.exc_info()[0])
                raise
            else:
                return cls.get_resource_with_id(hashval)

    @classmethod
    def get_resource_with_data(cls, url):
        hashval = cls.hashurl(url)
        return cls.get_article_with_id(hashval)

    @classmethod
    def get_resource_with_id(cls, hashval):
        """ Get article by id """
        return client[cls.db_name][cls.coll_name].find_one({"_id": hashval})








