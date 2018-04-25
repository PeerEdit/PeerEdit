import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/auth';

function mapStateToProps(state) {
    return {
        inProg: state.auth.isAuthenticating,
        isAuthenticated: state.auth.isAuthenticated,
        statusText: state.auth.statusText,
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class LoginForm extends React.Component {

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
        this.props.loginUser(this.state.email, this.state.password);
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
                {this.props.statusText ? <p>{this.props.statusText}</p> : null}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>Email:&nbsp;&nbsp;</label>
                    <input id='email' type='text' onChange={this.handleEmailFieldChange} /><br/>
                    <label htmlFor='password'>Password:&nbsp;&nbsp;</label>
                    <input id='password' type='password' onChange={this.handlePasswordFieldChange} /><br/>
                    <button onClick={this.handleSubmit}>Login</button>
                </form>
            </div>
        ); 
    }
}

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export { LoginForm };