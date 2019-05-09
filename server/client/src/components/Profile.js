import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
    render() {
        return (
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
                                register</button>
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
        );
    }
}
export default Profile;