import React from "react";
import "./Admin.css"
import OrderTable from "./OrderTable/OrderTable";
import Actions from "./Actions/Actions";

function Admin() {
    return (
        <div className="adminAppContainer">
            <Actions/>
            <OrderTable/>
        </div>
    );
}

export default Admin;