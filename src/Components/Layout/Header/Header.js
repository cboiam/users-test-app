import React from "react";
import "./Header.css";

const header = () => {
    return (
        <div className="Header">
            <div className="Header-Title">
                <div className="Header-Logo Background-Primary">
                    <i className="fas fa-question"></i>
                </div>
                <h1 className="Header-App-Name">Venturus Sports</h1>
            </div>
        </div>
    );
};

export default header;