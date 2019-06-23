import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import Users, { getRandomOption, rideInGroupOptions, dayOfTheWeekOptions } from "./Components/Users/Users";
import Axios from "axios";
import Registration from "./Components/Registration/Registration";

class App extends React.Component {
  state = {
    users: []
  }

  componentWillMount() {
    Axios.get("https://jsonplaceholder.typicode.com/users").then(result => {
      const users = result.data.map(user => {
        return {
          ...user,
          rideInGroup: getRandomOption(rideInGroupOptions),
          dayOfTheWeek: getRandomOption(dayOfTheWeekOptions)
        }
      });

      this.setState({ users });
    });
  }

  deleteUser = userId => {
    const users = [...this.state.users];
    const userIndex = users.findIndex(user => user.id === userId);
    users.splice(userIndex, 1);

    this.setState({ users });
  }

  addUser = user => {
    const userIds = this.state.users.map(user => user.id);
    const nextId = Math.max(...userIds) + 1;
    user.id = nextId;

    const users = [...this.state.users];
    users.push(user);

    this.setState({ users });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact render={() => <Redirect to="/users" />} />
          <Route path="/users" exact render={() => <Users users={this.state.users} deleteUser={this.deleteUser} />} />
          <Route path="/users/new" render={() => <Registration addUser={this.addUser} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
