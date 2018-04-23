#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bson.objectid import ObjectId
from flask.json import JSONEncoder

class MongoDBJSONEncoder(JSONEncoder):

    def default(self, obj):
        try:
            if isinstance(obj, ObjectId):
                return str(obj)
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)
