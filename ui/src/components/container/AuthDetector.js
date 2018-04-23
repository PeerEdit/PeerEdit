import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/auth';

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

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.logoutInPlace();
    }

    render() {
        if (this.props.userName) {
            return (
              <div>
                <p>Hi, {this.props.userName}</p>
                <button onClick={this.handleLogout}>Logout</button>
              </div>
            );
        }
        else {
            return (<p>Not authenticated</p>)
        }
    }
}

AuthDetector = connect(mapStateToProps, mapDispatchToProps)(AuthDetector);
export { AuthDetector };