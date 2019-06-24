import React from "react";
import "./Messages.css";

const messages = () => {
    return (
        <div className="Registration-Messages">
            <div>
                <h1 className="Registration-Messages-Title Primary">Need help?</h1>
                <div className="Registration-Messages-Info">
                    <div className="Primary Registration-Messages-Icon">
                        <i className="far fa-life-ring"></i>
                    </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>
            </div>
            <div>
                <h1 className="Registration-Messages-Title Primary">Why register?</h1>
                <div className="Registration-Messages-Info">
                    <div className="Primary Registration-Messages-Icon">
                        <i className="fas fa-heartbeat"></i>
                    </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>
            </div>
            <div>
                <h1 className="Registration-Messages-Title Primary">What people are saying...</h1>
                <div className="Registration-Messages-Info">
                    <div className="Primary Registration-Messages-Icon">
                        <i className="far fa-smile"></i>
                    </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>
            </div>
        </div>
    );
}

export default messages;