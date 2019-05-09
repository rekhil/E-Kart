import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateProfile } from "../actions/authActions";
import classnames from "classnames";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            currentPassword: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        } else {
            this.setState({
                name: this.props.auth.name,
                currentPassword: ''
            });
            this.nameInput.focus();
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const updateUser = {
            email: this.props.auth.email,
            name: this.state.name,
            currentPassword: this.state.currentPassword,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.updateProfile(updateUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/profile" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to profile</Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4><b>Update Profile</b></h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    ref={(input) => { this.nameInput = input; }}
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.currentPassword}
                                    error={errors.currentPassword}
                                    id="currentPassword"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.currentPassword
                                    })}
                                />
                                <label htmlFor="currentPassword">Current Password</label>
                                <span className="red-text">{errors.currentPassword}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <label htmlFor="password">New Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <label htmlFor="password2">Confirm New Password</label>
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default connect(mapStateToProps, { updateProfile })(EditProfile);