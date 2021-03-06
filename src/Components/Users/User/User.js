import React from "react";
import "./User.css";

const user = props => {
  const classes = ["User"];
  if (props.isEven) {
    classes.push("Even");
  }

  return (
    <tr className={classes.join(" ")}>
      <td>{props.username}</td>
      <td>{props.name}</td>
      <td>
        <a className="Primary" href={`mailto:${props.email}`}>
          {props.email}
        </a>
      </td>
      <td className="Primary">{props.address.city}</td>
      <td>{props.rideInGroup}</td>
      <td>{props.dayOfTheWeek}</td>
      <td className="Primary">{props.posts}</td>
      <td className="Primary">{props.albums}</td>
      <td>{props.photos}</td>
      <td onClick={() => props.deleteUser(user.id)}>
        <i className="fas fa-trash Primary User-Remove"></i>
      </td>
    </tr>
  );
};

export default user;
