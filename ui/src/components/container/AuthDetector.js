import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const actionCreators = {};

function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class AuthDetector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.userName) {
            return (<p>Hi, {this.props.userName}</p>);
        }
        else {
            return (<p>Not authenticated</p>)
        }
    }
}

AuthDetector = connect(mapStateToProps, mapDispatchToProps)(AuthDetector);
export { AuthDetector };