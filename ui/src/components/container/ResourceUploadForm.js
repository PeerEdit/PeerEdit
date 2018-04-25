import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/upload';

function mapStateToProps(state) {
    return {
        authToken: state.auth.token,
        inProg: state.upload.inProg,
        uploadedObj: state.upload.uploadedObj,
        uploadErrors: state.upload.errors,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class ResourceUploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ""
        };

        this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUrlInputChange(event) {
        console.log(event.target.value);
        this.setState( {"url": event.target.value} );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendUrlRequest(this.state.url, this.props.authToken);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.url} onChange={this.handleUrlInputChange} />
                </form>
                {this.props.inProg ? <p>Indexing resource...</p> : null}
                {this.props.uploadedObj && ! this.props.uploadErrors 
                        ? <p>Successfully indexed resource</p> : null}
            </div>
        );
    }
}

ResourceUploadForm = connect(mapStateToProps, mapDispatchToProps)(ResourceUploadForm);
export { ResourceUploadForm };