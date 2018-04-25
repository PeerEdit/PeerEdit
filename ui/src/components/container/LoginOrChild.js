import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/auth';

import { LoginOrRegisterModal } from '../presentational/LoginOrRegisterModal';

function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class LoginOrChild extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (! this.props.userName) {
            return (
                <LoginOrRegisterModal message={this.props.message}/>
            );
        }
        else {
            return (
                this.props.children
            );
        }
    }
}

LoginOrChild = connect(mapStateToProps, mapDispatchToProps)(LoginOrChild);
export { LoginOrChild };