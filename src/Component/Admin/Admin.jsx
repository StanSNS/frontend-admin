import React from "react";
import "./Admin.css"
import OrderTable from "./OrderTable/OrderTable";
import Actions from "./Actions/Actions";
import AboutData from "./AboutData/AboutData";

function Admin() {
    return (
        <div className="adminAppContainer">
            <AboutData/>
            <Actions/>
            <OrderTable/>
        </div>
    );
}

export default Admin;