import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/auth';

function mapStateToProps(state) {
    return {
        inProg: state.auth.isRegistering,
        isRegistered: state.auth.isRegistered,
        isAuthenticated: state.auth.isAuthenticated,
        registerStatusText: state.auth.registerStatusText,
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            emailErrorText: "",
            passwordErrorText: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailFieldChange = this.handleEmailFieldChange.bind(this);
        this.handlePasswordFieldChange = this.handlePasswordFieldChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.registerUser(this.state.email, this.state.password);
    }

    handleEmailFieldChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordFieldChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div>
                {this.props.registerStatusText 
                    ? <p>{this.props.registerStatusText}</p> 
                    : null}
                <form onSubmit={this.handleSubmit}>
                    <input type='text' onChange={this.handleEmailFieldChange} />
                    <input type='password' onChange={this.handlePasswordFieldChange} />
                    <button onClick={this.handleSubmit}>Register User</button>
                </form>
            </div>
        ); 
    }
}

RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
export { RegisterForm };