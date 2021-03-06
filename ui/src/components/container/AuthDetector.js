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
                <p>Welcome, {this.props.userName} <button onClick={this.handleLogout}>Logout</button></p>

              </div>
            );
        }
        else {
            return null
        }
    }
}

AuthDetector = connect(mapStateToProps, mapDispatchToProps)(AuthDetector);
export { AuthDetector };