from flask_testing import TestCase
from application.app import app, client
from application.models import User
import os
from setup import basedir
import json
import schema.define_schemas


class BaseTestConfig(TestCase):
    default_user = {
        "email": "default@gmail.com",
        "password": "something2"
    }

    def create_app(self):
        app.config.from_object('config.TestingConfig')
        return app

    def setUp(self):
        self.app = self.create_app().test_client()
        client['peeredit'].command('dropDatabase')

        schema.define_schemas.define_schemas(client)

        res = self.app.post(
                "/api/create_user",
                data=json.dumps(self.default_user),
                content_type='application/json'
        )

        self.token = json.loads(res.data.decode("utf-8"))["token"]

    def tearDown(self):
        client['peeredit'].command('dropDatabase')
