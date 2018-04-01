from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from application.app import app, client
import schema.define_schemas as schema

manager = Manager(app)

@manager.command
def create_db():
    """Creates the JSON schema definitions."""
    schema.define_schemas(client)

if __name__ == '__main__':
    manager.run()
