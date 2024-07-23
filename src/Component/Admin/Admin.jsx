import React from "react";
import "./Admin.css"
import Actions from "./Actions/Actions";
import AboutData from "./AboutData/AboutData";
import Orders from "./Orders/Orders";

function Admin() {
    return (
        <div className="adminAppContainer">
            <AboutData/>
            <Actions/>
            <Orders/>
        </div>
    );
}

export default Admin;