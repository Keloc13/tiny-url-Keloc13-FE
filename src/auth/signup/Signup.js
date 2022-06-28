import React from "react";
import "./Signup.css"
import { Outlet, Link } from "react-router-dom";

class Signup extends React.Component {
    render() {
        return( 
            <div className="main_outer_container" id="signup_container">
                <div className="main_inner_container" id="signup_inner_container">
                    <h3>Login</h3>
                    <form id="signup_form">
                        <div><label>Email</label></div>
                        <input type="email" name="email" id="email" placeholder="example@gmail.com"/>
                        <div><label>Password</label></div>
                        <input type="password" name="password" id="password" placeholder="test!123"/>
                        <div><label>Retype Password</label></div>
                        <input type="password" name="password" id="password" placeholder="test!123"/>
                        <div id="submit-button-container">
                            <input type="button" id="login-button" onClick={() => {this.signupAndRedirect()}} value="Signup"/>
                        </div>
                        <div id="signup_transition_container">
                            <Link id="signup-button" to={"/Signin"}>Signin</Link>
                            </div>
                    </form>
                </div>
            </div>
        )
    }

    signupAndRedirect() {
        console.log("Signup and redirect")
        const generatePage = `http://${window.location.host}/generate`
        window.location.replace(generatePage)
    }
}

export default Signup