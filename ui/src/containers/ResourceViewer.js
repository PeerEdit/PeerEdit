import React from 'react';

import { PdfViewer } from "../components/presentational/PdfViewer/PdfViewer";
import { DefaultViewer } from '../components/presentational/DefaultViewer/DefaultViewer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as actionCreators from '../actions/resource';

function mapStateToProps(state) {
    return {
        inProg: state.resource.inProg,
        resource: state.resource.resourceObj,
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
        if (this.props.resource && this.props.resource._id == this.props.params.resourceId) {
            // resource is already cached, no need to reload.
            return;
        }

        if (this.props.token) {
            this.props.getResource( this.props.params.resourceId, this.props.token);
        }
        else {
            // anonymous access to resource
            this.props.getResource( this.props.params.resourceId);
        }
    }

    addNewComment(text, viewerId, viewerData, replyTo) {
        return;
    }

    render() {
        if ( this.props.resource ) {
            switch( this.props.resource.kMIME ) {
                case('application/pdf'):
                    return (<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                                <PdfViewer
                                    resource={this.props.resource}
                                    addCommentFunction={this.addNewComment} />
                            </MuiThemeProvider>);
                default:
                    return (<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                                <DefaultViewer
                                    resource={this.props.resource}
                                    addCommentFunction={this.addNewComment} />
                            </MuiThemeProvider>);
            }
        }
        else {
            return null
        }
    }
}

ResourceViewer = connect(mapStateToProps, mapDispatchToProps)(ResourceViewer);
export { ResourceViewer };
