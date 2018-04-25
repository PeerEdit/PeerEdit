# PeerEdit

PeerEdit is an application platform for tools to better interface with data in various forms, as it changes over time. PeerEdit aims to make data more accessible and to make human insights about data indexable and searchable - promoting discovery and collaboration.

## Stack

* React / Redux
* Babel 6  / Webpack
* Flask
* Express.js
* NGINX
* MongoDB

![Architecture Diagram](docs/PeerEdit_Architecture.jpg?raw=true "Architecture Diagram")

## Configuring PeerEdit

In a development mode, you will generally run all components for the system on a single machine. Follow the configuration steps provided here.

### MongoDB

Install MongoDB on your system, following documentation [here](https://docs.mongodb.com/manual/installation/). Once MongoDB is installed, start it.
```sh
mongod
```

### Flask

PeerEdit is written and tested with Python 3.5.2 (python3). We recommend using [virtualenv](https://virtualenv.pypa.io/en/stable/) to segregate your python development environment, but global installation of dependencies is also possible.

A typical virtualenv installation follows the below steps.

```sh
virtualenv venv
. venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL="mongodb://localhost:27017/peeredit"
python manage.py runserver
````

Which should indicate that the server is running. If running MongoDB in a remote location, substitute the appropriate connection string to the  `DATABASE_URL` environment variable.

### Node.js (Express.js)

```sh
cd ui
npm install
npm start
```

### NGINX

```sh
sudo apt-get install nginx
sudo ./nginx/setup_nginx
sudo nginx -s reload
```


### Run Back-End

```sh
$ python manage.py runserver
```

### Test Back-End

```sh
$ python test.py --cov-report=term --cov-report=html --cov=application/ tests/
```

### Run Front-End

```sh
$ cd static
$ npm start
```

### Build Front-End

```sh
$ npm run build:production
```

## Attributions

Some icons have been copied into this project from ["flaticon"](https://www.freepik.com/flaticon).

The original boilerplate code for this project has been adapted from [React-Redux-Flask](https://github.com/dternyak/React-Redux-Flask) by [dternyak](https://github.com/dternyak).

The PdfViewer component has been adapted from [react-pdf-annotator](https://github.com/agentcooper/react-pdf-annotator) by [agentcooper](https://github.com/agentcooper).
