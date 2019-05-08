import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    handleSignUp = event => {
        alert('Cancelled')
    }


    render() {
        return (
            <React.Fragment>
                <form>
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
                    <button onClick={this.handleSignIn}>Login</button>
                </form>
                <Link to='/signup'>Create your E-Kart Account</Link>
            </React.Fragment>
        )
    }
}

export default SignIn;