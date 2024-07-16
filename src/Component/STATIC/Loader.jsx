import React from "react";
import "./Loader.css";

function Loader() {
    return (
        <div>
            <div className="overlayBlocker"></div>
            <div className="overlayLoader">
                <div className="loader"></div>
            </div>
        </div>
    );
}

export default Loader;
