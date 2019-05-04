import React, { Component } from 'react';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleSignIn = event => {
        alert('Sign In Successfully')
        event.preventDefault();
    }

    handleCancel = event => {
        alert('Cancelled')
    }


    render() {
        return (
            <form onSubmit={this.handleSignIn}>
                <div>
                    <label>Email</label>
                    <input type='text' value={this.state.email} onChange={this.handleEmailChange}>
                    </input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='text' value={this.state.password} onChange={this.handlePasswordChange}>
                    </input>
                </div>
                <button type='Submit'>Login</button>
                <button onClick={this.handleCancel}>Cancel</button>
            </form>
        )
    }
}

export default SignIn;