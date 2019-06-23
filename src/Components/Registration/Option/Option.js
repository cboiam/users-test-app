import React, { Fragment } from "react";
import "./Option.css";

const capitalize = value => {
    return value[0].toUpperCase() + value.substr(1, value.length - 1);
}

const option = props => {
    return (
        <div className="Option-Container No-Instructions">
            <div className="Option-Label">{props.label}</div>
            <div className="Option-Group">
                {props.options.map(option => {
                    return (
                        <Fragment key={option.value}>
                            <label className={`Option-Input-Label ${capitalize(props.type)}`}>{option.value}
                                <input type={props.type}
                                    name={props.name}
                                    value={option.value}
                                    checked={option.selected}
                                    className="Option-Input"
                                    onChange={() => props.change(option.value, props.name)}
                                />
                                <span className="Option-Checkmark Border-Primary-Options"></span>
                            </label>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default option;