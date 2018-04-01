from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import BaseConfig
from flask_bcrypt import Bcrypt
import pymongo as pm

app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.config.from_object(BaseConfig)
client = pm.MongoClient(BaseConfig.MONGODB_DATABASE_URI) # SQLAlchemy(app)
bcrypt = Bcrypt(app)
