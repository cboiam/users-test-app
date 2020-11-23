import React, { Component, Fragment } from "react";
import User from "./User/User";
import "./Users.css";
import Axios from "axios";
import Messages from "./Messages/Messages";
import { Link } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL ?? "";

export const rideInGroupOptions = ["Always", "Sometimes", "Never"];
export const dayOfTheWeekOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "None", "Weekends", "Week days", "Every day"];

export const getRandomOption = options => {
  const index = Math.floor((Math.random() * options.length));
  return options[index];
}

class Users extends Component {
  state = {
    filter: "",
    filteredUsers: [],
    posts: [],
    photos: [],
    albums: []
  };

  getPosts = () => Axios.get("https://jsonplaceholder.typicode.com/posts");
  getPhotos = () => Axios.get("https://jsonplaceholder.typicode.com/photos");
  getAlbums = () => Axios.get("https://jsonplaceholder.typicode.com/albums");

  componentWillMount() {
    Axios.all([this.getPosts(), this.getPhotos(), this.getAlbums()])
      .then(Axios.spread((posts, photos, albums) => {
        this.setState({
          filteredUsers: this.props.users,
          posts: posts.data,
          photos: photos.data,
          albums: albums.data
        });

        this.filterUsers(this.state.filter);
      }));
  }

  mapUsers = () => {
    return this.state.filteredUsers.map((user, index) => {
      const isEven = (index + 1) % 2 === 0;
      const posts = this.state.posts.filter(post => post.userId === user.id).length;
      const albums = this.state.albums.filter(album => album.userId === user.id)
          .map(album => album.id);
      const photos = this.state.photos.filter(photo => albums.includes(photo.albumId));

      return <User {...user}
        isEven={isEven}
        key={user.id}
        posts={posts}
        albums={albums.length}
        photos={photos.length}
        deleteUser={this.props.deleteUser}
      />;
    });
  };

  onFilterChange = ({ target }) => {
    this.setState({ filter: target.value });
    this.filterUsers(target.value);
  };

  filterUsers = value => {
    const users = this.props.users.filter(user => {
      const [username, name] = [user.username.toLowerCase(), user.name.toLowerCase()];
      return username.indexOf(value) >= 0 || name.indexOf(value) >= 0;
    });

    this.setState({ filteredUsers: users });
  };


  render() {
    return (
      <Fragment>
        <Messages />
        <div className="Users">
          <div className="Users-Header">
            <div className="Users-Title">
              <h1>Users</h1>
            </div>
            <div className="Users-Item Users-Divider" />
            <div className="Users-Item Users-Search">
              <i className="fas fa-search Users-Search-Icon" />
              <input
                className="Users-Search-Input"
                type="text"
                placeholder="Filter table content"
                onChange={this.onFilterChange}
              />
            </div>
          </div>
          <div className="Users-Table">
            <table cellSpacing="0" cellPadding="0">
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
            <Link to={`${baseUrl}/users/new`} className="Users-Add Primary">
              <i className="fas fa-plus"></i>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Users;
