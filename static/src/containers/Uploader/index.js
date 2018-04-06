import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import axios from 'axios';

// requests for main page

const computeFileHash = (f) => {
    return 9393202
}

// components for main view

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            name: "",
            desc: "",
        }

        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUrlChange(event) {
        this.setState({url: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleDescChange(event) {
        this.setState({desc: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("form submitted");
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField hintText="https://..." name="link" />
            </form>
        );
    }
}

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: []
        }

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFileChange(event) {
        console.log(event.target.files);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleFileChange}/>
            </form>
        );
    }
}


class Uploader extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node,
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <section>
                        <h1>Welcome to PeerEdit</h1>
                        <div>
                            Want to contribute to world knowledge? Tell us about a resource.
                        </div>
                    </section>
                    <section>
                        <h1>Search for a Resouce</h1>
                        <p>
                           Simply upload a file here, and we will search our database to see if it 
                           has been previously reported in the public domain. If not, please report it
                           using the form below.
                        </p>
                        <Paper>
                            <SearchForm />
                        </Paper>
                    </section>
                    <section>
                        <h1>Report New Resource</h1>
                        <Paper>
                            <hr />
                            <UploadForm />
                        </Paper>
                    </section>
                </div>
            </MuiThemeProvider>
        );
    }
}

export { Uploader };
