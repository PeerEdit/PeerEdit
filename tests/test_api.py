# -*- coding: utf-8 -*-

from testing_config import BaseTestConfig
from application.models import User
import json
from application.utils import auth
from index import bcrypt

class TestAPI(BaseTestConfig):
    some_user = {
        "email": "one@gmail.com",
        "password": "something1"
    }

    def test_create_new_user(self):
        self.assertIsNone(User.get_user_with_email(
            self.some_user["email"]
        ))

        res = self.app.post(
                "/api/create_user",
                data=json.dumps(self.some_user),
                content_type='application/json'
        )
        self.assertEqual(res.status_code, 200)
        self.assertTrue(json.loads(res.data.decode("utf-8"))["token"])
        self.assertEqual(User.get_user_with_email(self.some_user["email"])["email"],
                        self.some_user["email"])

        res2 = self.app.post(
                "/api/create_user",
                data=json.dumps(self.some_user),
                content_type='application/json'
        )

        self.assertEqual(res2.status_code, 409)

    def test_get_token_and_verify_token(self):
        res = self.app.post(
                "/api/get_token",
                data=json.dumps(self.default_user),
                content_type='application/json'
        )

        token = json.loads(res.data.decode("utf-8"))["token"]
        self.assertTrue(auth.verify_token(token))
        self.assertEqual(res.status_code, 200)

        res2 = self.app.post(
                "/api/is_token_valid",
                data=json.dumps({"token": token}),
                content_type='application/json'
        )

        self.assertTrue(json.loads(res2.data.decode("utf-8")), ["token_is_valid"])

        res3 = self.app.post(
                "/api/is_token_valid",
                data=json.dumps({"token": token + "something-else"}),
                content_type='application/json'
        )

        self.assertEqual(res3.status_code, 403)

        res4 = self.app.post(
                "/api/get_token",
                data=json.dumps(self.some_user),
                content_type='application/json'
        )

        self.assertEqual(res4.status_code, 403)

    def test_protected_route(self):
        headers = {
            'Authorization': self.token,
        }

        bad_headers = {
            'Authorization': self.token + "bad",
        }

        response = self.app.get('/api/user', headers=headers)
        self.assertEqual(response.status_code, 200)
        response2 = self.app.get('/api/user')
        self.assertEqual(response2.status_code, 401)
        response3 = self.app.get('/api/user', headers=bad_headers)
        self.assertEqual(response3.status_code, 401)

    def test_index_resource(self):
        headers = {
            'Authorization': self.token,
        }

        res = self.app.post(
                "/api/index_new_resource",
                data=json.dumps({"url": "http://localhost:5000/api/pdf/pdf2.pdf"}),
                content_type='application/json',
                headers=headers
            )
        print("=== {}".format(res.response))
        self.assertTrue(res.status_code == 200)
