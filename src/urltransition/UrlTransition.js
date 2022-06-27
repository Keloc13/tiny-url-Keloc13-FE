import React from "react";
import { Outlet, Link, useParams } from "react-router-dom";


class UrlTransition extends React.Component {
    render(){
        return(
            <div style={{ display: "flex" }}>
                <nav>
                    <Link to={'/Get/12345'} key="12345">
                        1234
                    </Link>
                </nav>
                <Outlet />
            </div>
        )
    }
}

export default UrlTransition