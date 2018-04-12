from flask import request, render_template, jsonify, url_for, redirect, g, send_from_directory
from .models import User, Resource
from index import app, client
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')

@app.route('/api/pdf/<path:path>', methods=['GET'])
def send_pdf(path):
    return send_from_directory('application/assets/pdf', path)

@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)

@app.route("/api/create_comment", methods=["POST"])
def create_comment():
    incoming = request.get_json()
    comment = Comment(
        article_id=incoming["article_id"]
        ,slug_hash=incoming["slug_hash"]
        ,content_text=incoming["content_text"]
        ,position_data=incoming["position_data"]
    )
    db.session.add(comment)

@app.route("/api/get_resource_from_hash/<hashval>", methods=["GET"])
def get_hash(hashval):

    with client.start_session(causal_consistency=True) as session:
        try:
            return jsonify(Resource.get_resource_with_id(hashval))
        except Exception as e:
            print(e)
            return jsonify(message="Could not find resource with that hash"), 404

@app.route("/api/index_new_resource", methods=["POST"])
@requires_auth
def create_new_resource():
    incoming = request.get_json()

    with client.start_session(causal_consistency=True) as session:
        print(g.current_user)
        try:
            resource = Resource.index_new_resource({
                        "url": incoming["url"]
                    }, g.current_user)
        # TODO: add additional error handling here.
        except Exception as e:
            print(e)
            return jsonify(message="Resource already exists and is indexed"), 409
        else:
            return jsonify(resource)

@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()

    with client.start_session(causal_consistency=True) as session:
        try:
            User.create_new_user({
                "email": incoming["email"]
                ,"password": incoming["password"]
            })

            new_user = User.get_user_with_email(email=incoming["email"])

            return jsonify(
                id=str(new_user['_id']),
                token=generate_token(new_user)
            )

        # TODO: add additional error handling here.
        except Exception as e:
            print(e)
            return jsonify(message="User with that email already exists"), 409

@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
