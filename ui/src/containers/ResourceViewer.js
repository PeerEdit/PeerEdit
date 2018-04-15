import React from 'react';

import { PDFViewer } from "../components/presentational/PDFViewer/PDFViewer";
import { DefaultViewer } from '../components/presentational/DefaultViewer/DefaultViewer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/resource';

function mapStateToProps(state) {
    return {
        isLoading: state.resource.isLoading,
        resource: state.resource.resource,
        token: state.auth.token
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class ResourceViewer extends React.Component {

    constructor(props) {
        super(props);

        this.addNewComment = this.addNewComment.bind(this);
    }

    componentDidMount() {
        if (this.props.resource._id == this.props.match.params.resourceId) {
            // resource is already cached, no need to reload.
            return;
        }

        if (this.props.token) {
            this.props.getResource( this.props.match.params.resourceId, this.props.token);
        }
        else {
            // anonymous access to resource
            this.props.getResource( this.props.match.params.resourceId);
        }
    }

    addNewComment(text, viewerId, viewerData, replyTo) {
        return;
    }

    render() {
        switch( this.props.resource.kMIME ) {
            case('application/pdf'):
                return (<PDFViewer
                            resource={this.props.resource}
                            addCommentFunction={this.addNewComment} />);
            default:
                return (<DefaultViewer
                            resource={this.props.resource}
                            addCommentFunction={this.addNewComment} />);
        }

    }
}

ResourceViewer = connect(mapStateToProps, mapDispatchToProps)(ResourceViewer);
export { ResourceViewer };
