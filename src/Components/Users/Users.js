import React from "react";
import User from "./User/User";
import "./Users.css";
import Axios from "axios";

const rideInGroupOptions = ["Never", "Sometiems", "Always"];
const dayOfTheWeekOptions = ["Never", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Weekends", "Week days", "Every day"];

const getRandomOption = options => {
  const index = Math.floor((Math.random() * options.length));
  return options[index];
}

class Users extends React.Component {
  state = {
    users: [],
    filteredUsers: [],
    posts: [],
    photos: []
  };

  componentWillMount() {
    Axios.get("https://jsonplaceholder.typicode.com/users").then(result => {
      this.setState({ users: result.data, filteredUsers: result.data });
    });

    Axios.get("https://jsonplaceholder.typicode.com/posts").then(result => {
      this.setState({ posts: result.data });
    });

    Axios.get("https://jsonplaceholder.typicode.com/photos").then(result => {
      this.setState({ photos: result.data });
    });
  }

  deleteUser = userId => {
    const users = [...this.state.users];
    const userIndex = users.findIndex(user => user.id === userId);
    users.splice(userIndex, 1);
    this.setState({ users: users, filteredUsers: users });
  }

  mapUsers = () => {
    return this.state.filteredUsers.map((user, index) => {
      const isEven = (index + 1) % 2 === 0;
      const rideInGroup = getRandomOption(rideInGroupOptions);
      const dayOfTheWeek = getRandomOption(dayOfTheWeekOptions);
      const posts = this.state.posts.filter(post => post.userId === user.id).length;
      return <User {...user}
        isEven={isEven}
        key={user.id}
        posts={posts}
        rideInGroup={rideInGroup}
        dayOfTheWeek={dayOfTheWeek}
        deleteUser={this.deleteUser}
      />;
    });
  };

  filterUsers = ({ target }) => {
    const users = this.state.users.filter(user => {
      const [username, name] = [user.username.toLowerCase(), user.name.toLowerCase()];
      return username.indexOf(target.value) >= 0 || name.indexOf(target.value) >= 0;
    });

    this.setState({ filteredUsers: users });
  };

  render() {
    return (
      <div className="Users">
        <div className="Users-Header">
          <div className="Users-Item">
            <h1 className="Users-Title">Users</h1>
          </div>
          <div className="Users-Item Users-Divider" />
          <div className="Users-Item Users-Search">
            <i className="fas fa-search Users-Search-Icon" />
            <input
              className="Users-Search-Input"
              type="text"
              placeholder="Filter table content"
              onChange={this.filterUsers}
            />
          </div>
        </div>
        <div>
          <table className="Users-Table" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <td className="Users-Table-Head">Username</td>
                <td className="Users-Table-Head">Name</td>
                <td className="Users-Table-Head">E-mail</td>
                <td className="Users-Table-Head">City</td>
                <td className="Users-Table-Head">Ride in group</td>
                <td className="Users-Table-Head">Day of the week</td>
                <td className="Users-Table-Head">Posts</td>
                <td className="Users-Table-Head">Albums</td>
                <td className="Users-Table-Head">Photos</td>
                <td className="Users-Table-Head"></td>
              </tr>
            </thead>
            <tbody>{this.mapUsers()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;
