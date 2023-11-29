import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();

  const logout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/authentication-node/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      if (res.status === 200) {
        (function () {
          props.notify({ msg: "Logout Successfully", status: "Success" });
        })();
        localStorage.clear();
        navigate("/login");
      } else {
        console.log("some unusal error occurred");
      }
    });
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-${
          props.mode === "black" ? "black" : "white"
        }`}
      >
        <div className="container-fluid">
          <a
            className={`navbar-brand ${
              props.mode === "black" ? "text-white" : "text-black"
            }`}
            href="#"
          >
            <img src="./favicon.ico" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link active ${
                    props.mode === "black" ? "text-white" : "text-black"
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {props.loggedIn ? (
                <></>
              ) : (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      props.mode === "black" ? "text-white" : "text-black"
                    }`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
              {props.loggedIn ? (
                <></>
              ) : (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      props.mode === "black" ? "text-white" : "text-black"
                    }`}
                    to="/sign_up"
                  >
                    Sign Up
                  </Link>
                </li>
              )}
              {props.loggedIn ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      props.mode === "black" ? "text-white" : "text-black"
                    }`}
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    props.mode === "black" ? "text-white" : "text-black"
                  }`}
                  to="/subscription"
                >
                  Subscription
                </Link>
              </li>
              {props.loggedIn ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      props.mode === "black" ? "text-white" : "text-black"
                    }`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${
                    props.mode === "black" ? "text-white" : "text-black"
                  }`}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {props.loggedIn ? (
                      <a
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                        href="#"
                      >
                        Logout
                      </a>
                    ) : (
                      <span style={{ paddingLeft: "15px" }}>
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to="/login"
                        >
                          Login
                        </Link>
                        /
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to="/sign_up"
                        >
                          Sign Up
                        </Link>
                      </span>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
            <table style={{ marginRight: "20px", display: "flex" }}>
              <tbody style={{ display: "flex" }}>
                <tr
                  onClick={() => props.mode_color("#dc3545")}
                  style={{ backgroundColor: "#dc3545" }}
                >
                  <td style={{ color: "#dc3545" }}>color</td>
                </tr>
                <tr
                  onClick={() => props.mode_color("#28a745")}
                  style={{ backgroundColor: "#28a745" }}
                >
                  <td style={{ color: "#28a745" }}>color</td>
                </tr>
                <tr
                  onClick={() => props.mode_color("black")}
                  style={{ backgroundColor: "black" }}
                >
                  <td style={{ color: "black" }}>color</td>
                </tr>
                <tr
                  onClick={() => props.mode_color("#1abc9c")}
                  style={{ backgroundColor: "#1abc9c" }}
                >
                  <td style={{ color: "#1abc9c" }}>color</td>
                </tr>
              </tbody>
            </table>
            <span
              style={{
                color: `${props.mode === "black" ? "white" : "black"}`,
              }}
            >
              Enable color mode
            </span>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
//Navbar.propTypes = { title: PropTypes.string.isRequired };
//Navbar.defaultProps = { title: "IGI" };
