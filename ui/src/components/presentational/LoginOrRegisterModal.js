import React from 'react';

import { LoginForm } from '../container/LoginForm';
import { RegisterForm } from '../container/RegisterForm'; 

class LoginOrRegisterModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayLoginForm: true // or register
        };

        this.handleMoveToRegister = this.handleMoveToRegister.bind(this);
        this.handleMoveToLoginPage = this.handleMoveToLoginPage.bind(this);
    }

    handleMoveToRegister(event) {
        this.setState({displayLoginForm: false});
    }

    handleMoveToLoginPage(event) {
        this.setState({displayLoginForm: true});
    }

    render() {
        return (
            <div style={{margin: "2em"}}>
                {this.props.message ? <h4>{this.props.message}</h4> : null}
                {this.state.displayLoginForm
                    ? (<div>
                            <LoginForm {...this.props} />
                            <a href="javascript:void(0)" onClick={this.handleMoveToRegister}>
                                No account? Click to register!
                            </a>
                       </div>)
                    : (<div>
                            <RegisterForm {...this.props} />
                            <a href="javascript:void(0)" onClick={this.handleMoveToLoginPage}>
                                Already have an account? Click to login!
                            </a>
                       </div>)}
            </div>
        );
    }

}

export { LoginOrRegisterModal };