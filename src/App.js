import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import Users, { getRandomOption, rideInGroupOptions, dayOfTheWeekOptions } from "./Components/Users/Users";
import Axios from "axios";
import Registration from "./Components/Registration/Registration";
import Breadcrumb from "./Components/Layout/Breadcrumb/Breadcrumb";
import Header from "./Components/Layout/Header/Header";

const baseUrl = process.env.REACT_APP_BASE_URL ?? "";

class App extends Component {
  state = {
    users: []
  };

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
  };

  addUser = user => {
    const userIds = this.state.users.map(user => user.id);
    const nextId = Math.max(...userIds) + 1;
    user.id = nextId;

    const users = [...this.state.users];
    users.push(user);

    this.setState({ users });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App" onClick={this.closeMenu}>
          <Header />
          <Route path={`${baseUrl}/`} component={props => <Breadcrumb {...props} />} />
          <Route path={`${baseUrl}/`} exact component={() => <Redirect to={`${baseUrl}/users`} />} />
          <Route path={`${baseUrl}/users`} exact component={() => <Users users={this.state.users} deleteUser={this.deleteUser} />} />
          <Route path={`${baseUrl}/users/new`} component={() => <Registration addUser={this.addUser} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
