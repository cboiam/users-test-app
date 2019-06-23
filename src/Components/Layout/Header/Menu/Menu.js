import React from "react";
import "./Menu.css";

const menu = props => {
    const menuClass = props.showMenu ? "Menu Active" : "Menu";

    return (
        <div className={menuClass}>
            <div className="Menu-Item">Friends List</div>
            <div className="Menu-Item">Saved Items</div>
            <div className="Menu-Item">Notifications</div>
            <div className="Menu-Item">User Preferences</div>
            <hr className="Menu-Separator" />
            <div className="Menu-Item">Log out</div>
        </div>
    );
};

export default menu;