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
            <div>
                {this.state.displayLoginForm
                    ? (<div>
                            <LoginForm />
                            <a href="#" onClick={this.handleMoveToRegister}>
                                No account? Click to register!
                            </a>
                       </div>)
                    : (<div>
                            <RegisterForm />
                            <a href="#" onClick={this.handleMoveToLoginPage}>
                                Already have an account? Click to login!
                            </a>
                       </div>)}
            </div>
        );
    }

}

export { LoginOrRegisterModal };