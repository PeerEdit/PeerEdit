

def define_schemas(client):
    """ Define JSON schema for all collections with client """

    client["peeredit"]["user"].create_index([("email",1)], unique=True)

    pass