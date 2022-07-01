import React from "react";
import "../../common/normalized_container.css"
import "./Signin.css"
import { Outlet, Link } from "react-router-dom";
import cognitoClient from "../api/CognitoClient";

class Signin extends React.Component {
    render() {
        return(
            <div className="main_outer_container" id="login_container">
                <div className="main_inner_container" id="login_inner_container">
                    <h3>Login</h3>
                    <form id="signin-form">
                        <div><label>Email</label></div>
                        <input type="email" name="email" id="email" placeholder="example@gmail.com"/>
                        <div><label>Password</label></div>
                        <input type="password" name="password" id="password" placeholder="test!123" value="Test123!@#@"/>
                        <div id="submit-button-container">
                            <input type="button" id="login-button" onClick={() => {this.signinAndRedirect()}} value="Signin"/>
                        </div>
                        <div id="signup-container">
                            <Link id="signup-button" to={"/Signup"}>Signup</Link>
                            </div>
                    </form>
                </div>
            </div>
        )
    }

    signinAndRedirect() {
        console.log("Signin and redirect")

        let username = document.getElementById("email").value
        let password = document.getElementById("password").value
        cognitoClient.signin(username, password, () => { })
        // const generatePage = `http://${window.location.host}/generate`
        // window.location.replace(generatePage)
    }
}

export default Signin