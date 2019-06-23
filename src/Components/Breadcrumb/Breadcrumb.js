import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const getLink = (pathname, path) => pathname.substr(0, pathname.indexOf(path)) + path;

const breadcrumb = ({ location }) => {
    return (
        <div className="Breadcrumb">
            <div>
                <Link className="Breadcrumb-Link Primary" to="/">
                    <i className="fas fa-home"></i>
                </Link>
            </div>
            {location.pathname.split("/").map((path, index) => {
                if (!path) return null;

                return (
                    <Fragment key={index}>
                        <div>
                            <i className="Breadcrumb-Chevron fas fa-chevron-right"></i>
                            <Link className="Breadcrumb-Link Primary-Action" to={getLink(location.pathname, path)}>
                                {path}
                            </Link>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}

export default breadcrumb;