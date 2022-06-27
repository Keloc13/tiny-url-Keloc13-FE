import React from "react";
import { Outlet, Link } from "react-router-dom";

class Signin extends React.Component {
    render() {
        return(
            <div>
                signin page
                <ul>
                    <li><Link to="/">mainPage</Link></li>
                    <li><Link to="/signup">signup</Link></li>
                </ul>
            </div>
        )
    }
}

export default Signin