import React from "react";
import "./../navbar/style.css";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Navbar2(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/*
        <a className="navbar-brand" href="#">
          {props.title}
        </a>
        */}
        <a className="navbar-brand" href="#">
          IGI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/subscription">
                Subscription
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
//Navbar.propTypes = { title: PropTypes.string.isRequired };
//Navbar.defaultProps = { title: "IGI" };
