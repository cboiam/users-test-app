import React, { Component } from "react";
import "./Header.css";
import Axios from "axios";
import Profile from "./Profile/Profile";
import Menu from "./Menu/Menu";

class Header extends Component {
    state = {
        profile: null,
        showImage: Math.random() > 0.5,
        showMenu: false
    }

    componentWillMount() {
        Axios.get("https://randomuser.me/api/").then(result => {
            this.setState({ profile: result.data.results[0] });
        });
    }

    closeMenu = () => {
        this.setState({ showMenu: false });
    };

    toggleMenu = () => {
        const menu = this.state.showMenu;
        this.setState({ showMenu: !menu });
    };

    render() {
        return (
            <div className="Header">
                <div className="Header-Title">
                    <div className="Header-Logo Background-Primary">
                        <i className="fas fa-question"></i>
                    </div>
                    <h1 className="Header-App-Name">Venturus Sports</h1>
                </div>
                <Profile profile={this.state.profile} showImage={this.state.showImage} toggleMenu={this.toggleMenu} closeMenu={this.closeMenu}>
                    <Menu showMenu={this.state.showMenu} />
                </Profile>
            </div>
        );
    }
}

export default Header;