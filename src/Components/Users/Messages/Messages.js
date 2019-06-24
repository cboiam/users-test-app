import React from "react";
import "./Messages.css";

const messages = () => {
    return (
        <div className="Users-Messages">
            <div>
                <div className="Users-Messages-Icon Primary">
                    <i className="fas fa-puzzle-piece"></i>
                </div>
                <div className="Users-Messages-Info">
                    <div>Sport type</div>
                    <h2>Cycling</h2>
                </div>
            </div>
            <div>
                <div className="Users-Messages-Icon Primary">
                    <i className="fas fa-trophy"></i>
                </div>
                <div className="Users-Messages-Info">
                    <div>Mode</div>
                    <h2>Advanced</h2>
                </div>
            </div>
            <div>
                <div className="Users-Messages-Icon Primary">
                    <i className="fas fa-map-signs"></i>
                </div>
                <div className="Users-Messages-Info">
                    <div>Route</div>
                    <h2>30 miles</h2>
                </div>
            </div>
        </div>
    );
}

export default messages;