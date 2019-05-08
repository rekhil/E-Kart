import React, { Component } from 'react';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleConfirmPasswordChange = event => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleSignUp = event => {
        alert('Sign In Successfully')
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSignUp} >
                <div>
                    <label>Email</label>
                    <input type='text' value={this.state.email} onChange={this.handleEmailChange}>
                    </input>
                </div>
                <div>
                    <label>Name</label>
                    <input type='text' value={this.state.name} onChange={this.handleNameChange}>
                    </input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='text' value={this.state.password} onChange={this.handlePasswordChange}>
                    </input>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type='text' value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}>
                    </input>
                </div>
                <button type='Submit'>Continue</button>
            </form>
        )
    }
}

export default SignUp;