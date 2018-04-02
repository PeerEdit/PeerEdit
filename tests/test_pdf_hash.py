# -*- coding: utf-8 -*-

from testing_config import BaseTestConfig
from application.models import Article
import json
from application.utils import auth
from index import bcrypt
from datetime import datetime

import xxhash

class TestPDFHash(BaseTestConfig):

    def test_upload_new_article(self):

        r1 = Article.index_new_article({
                "url": "http://localhost:5000/api/pdf/leewes.pdf"
            }, {
                "_id": 15
                , "email": "rahul@test.com"
            })

        print(r1)
        self.assertTrue(r1)
        article_id = r1.inserted_id

        r2 = Article.index_new_article({
                "url": "http://localhost:5000/api/pdf/leewes_dup.pdf"
            }, {
                "_id": 15
                , "email": "rahul@test.com"
            })

        r3 = Article.get_article_with_id(article_id)

        # both articles have been hashed to the same location
        self.assertTrue(len(r3['links']) == 2)

        r4 = Article.index_new_article({
            "url": "http://localhost:5000/api/pdf/pdf2.pdf"
        }, {
            "_id": 15
            , "email": "rahul@test.com"
        })

        r5 = Article.get_article_with_id(article_id)

        # both articles have been hashed to the same location
        self.assertTrue(len(r5['links']) == 2)

""" Speed tests commented out until perf testing
    def test_speed_upload_new_article(self):

        t1 = datetime.now()
        r = Article.index_new_article({
            "url": "http://www.anzjsurg.com/SpringboardWebApp/userfiles/anzjs/file/Medicine%20and%20Surgery.pdf"
        }, {
            "_id": 15
            , "email": "rahul@test.com"
        })
        self.assertTrue(r.acknowledged)
        t2 = datetime.now()
        print("%d seconds taken" % (t2 - t1).total_seconds())

        self.assertTrue( (t2 - t1).total_seconds() < 5)

    def test_speed_upload_large_dataset(self):

        t1 = datetime.now()
        r = Article.index_new_article({
            "url": "https://clinicaltrials.gov/AllPublicXML.zip"
        }, {
            "_id": 15
            , "email": "rahul@test.com"
        })
        self.assertTrue(r.acknowledged)
        t2 = datetime.now()
        print("%d seconds taken" % (t2 - t1).total_seconds())

        self.assertTrue( (t2 - t1).total_seconds() < 10)
"""

