from index import client, bcrypt
from datetime import datetime

from urllib.request import urlopen
from xxhash import xxh64
from filetype import filetype

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
    max_chunks_for_hash = 32

    @classmethod 
    def hashurl(cls, url):
        # hash binary
        i = 0
        x = xxh64()
        CHUNK = 64 * 1024
        with urlopen(url) as f:
            while not f.closed and i < cls.max_chunks_for_hash:
                i = i + 1
                chunk = f.read(CHUNK)
                if chunk == b'':
                    break
                x.update(f.read(CHUNK))

        # force representation by 64 bit signed int.
        # this halves the power of the hashing function
        return int(x.intdigest()/2)

    # see https://pypi.python.org/pypi/filetype#file-header
    # for rationale behind requiring only first 261 bytes
    @classmethod
    def get_filetype(cls, url):
        with urlopen(url) as f:
            return filetype.guess(f.read(261))

    # TODO: add network exception handling / retry logic
    @classmethod
    def index_new_resource(cls, resource, reporter):
        """ Index a new resource, hash, and store """
        hashval = cls.hashurl(resource['url'])
        guessed_type = cls.get_filetype(resource['url'])

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
                                    "_id": reporter["_id"]
                                    , "email": reporter["email"]
                                }
                            }
                        ]
                    }
                    if guessed_type is not None:
                        obj['kExt'] = guessed_type.extension
                        obj['kMIME'] = guessed_type.mime
                    return client[cls.db_name][cls.coll_name].insert_one(obj)

                elif not resource["url"] in [x["url"] for x in doc["links"]]:
                    return client[cls.db_name][cls.coll_name].update_one(
                        {"_id": hashval}
                        , {"$addToSet" : {"links": {
                            "url": resource["url"]
                            , "lastValidated": datetime.now()
                            , "reporter": {
                                "_id": reporter["_id"]
                                , "email": reporter["email"]
                            }
                        }}}
                    )
                else: # if link has already been reported, do nothing.
                    pass
            except Exception as e:
                raise e
            return None

    @classmethod
    def get_resource_with_data(cls, url):
        hashval = cls.hashurl(url)
        return cls.get_article_with_id(hashval)

    @classmethod
    def get_resource_with_id(cls, hashval):
        """ Get article by id """
        return client[cls.db_name][cls.coll_name].find_one({"_id": hashval})








