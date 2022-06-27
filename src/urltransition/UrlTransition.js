import React from "react";
import { Outlet, Link, useParams } from "react-router-dom";


class UrlTransition extends React.Component {
    render(){
        return(
            <div style={{ display: "flex" }}>
        
                <Outlet />
            </div>
        )
    }
}

export default UrlTransition