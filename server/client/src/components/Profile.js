import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Profile extends Component {
    hanldeLogoutClick = () => {
        this.props.logoutUser();
    };

    render() {
        var view = this.props.auth.isAuthenticated ?
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home</Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4><b>Profile Details</b></h4>
                        </div>

                        <div className="col s12" style={{ paddingLeft: "11.250px", paddingBottom: "30px" }}>
                            <h4><b>Name:</b> {this.props.auth.name}</h4>
                            <h4><b>Email:</b> {this.props.auth.email}</h4>
                        </div>

                        <div>
                            <Link to="/editprofile">
                                <button style={{
                                    width: "200px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    margin: "5px"
                                }}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Edit Profile</button>
                            </Link>

                            <Link to="/">
                                <button style={{
                                    width: "200px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    margin: "5px"
                                }}
                                    onClick={this.hanldeLogoutClick}
                                    className="btn btn-large waves-effect white hoverable black-text">
                                    Log Out</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4> You are not logged in</h4>
                        <Link to="/register">
                            <button style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                margin: "5px"
                            }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                Register</button>
                        </Link>

                        <Link to="/login">
                            <button style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                margin: "5px"
                            }}
                                className="btn btn-large waves-effect white hoverable black-text">
                                Log In</button>
                        </Link>
                    </div>
                </div>
            </div>

        return view;
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default connect(mapStateToProps, { logoutUser })(Profile);