import React from "react";
import "./Input.css";

export const inputTypes = ["text", "email", "password", "number", "tel", "date"];

const input = props => {
    let label = <div className="Input-Label">{props.label}</div>;
    if (!props.required) {
        label = (
            <div className="Input-Label-Optional">
                <div>{props.label}</div>
                <div>optional</div>
            </div>
        );
    }

    return (
        <div className="Input-Group">
            {label}
            <input type={props.type}
                name={props.name}
                value={props.value}
                onChange={event => props.change(event.target.value, props.name)}
                className="Input-Field Border-Primary-Input"
            />
            <div className="Input-Instructions">{props.instructions}</div>
        </div>
    );
}

export default input;