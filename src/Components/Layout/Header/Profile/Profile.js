import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.setNodeRef = this.setNodeRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleEscDown = this.handleEscDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener("keydown", this.handleEscDown);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener("keydown", this.handleEscDown);
    }

    setNodeRef = node => {
        this.node = node;
    };

    handleEscDown = event => {
        if (event.keyCode === 27) {
            this.props.closeMenu();
        }
    };

    handleClickOutside = event => {
        if (this.node && !this.node.contains(event.target)) {
            this.props.closeMenu();
        }
    };

    render() {
        if (this.props.profile === null) {
            return null;
        }

        let image;
        const imageClasses = ["Profile-Image"];
        if (this.props.showImage) {
            image = <img src={this.props.profile.picture.thumbnail} alt={`${this.props.profile.name.first[0]}'s profile`} />;
        } else {
            image = <span>{this.props.profile.name.first[0]}{this.props.profile.name.last[0]}</span>;
            imageClasses.push("No-Image");
        }

        return (
            <div className="Profile" ref={this.setNodeRef}>
                {this.props.children}
                <div className={imageClasses.join(" ")} onClick={this.props.toggleMenu}>
                    {image}
                </div>
                <div className="Profile-Name" onClick={this.props.toggleMenu}>{`${this.props.profile.name.first} ${this.props.profile.name.last}`}</div>
                <div className="Profile-Menu-Icon" onClick={this.props.toggleMenu}>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        );
    }
}

export default Profile;