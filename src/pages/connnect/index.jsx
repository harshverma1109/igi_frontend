import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import FacebookLoginButton from "../../../src/components/fb_login/index";
import "./style.css";

const Connect = (props) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("fbAccessToken")) navigate("/dashboard");
    props.title("Connect");
    checkLoginStatus();
  }, []);
  const checkLoginStatus = async () => {
    let token = localStorage.getItem("token");

    if (!token) {
      setLoggedIn(false);
      localStorage.clear();
      navigate("/login", { replace: true });
      return;
    }

    let myheader = {
      "Content-Type": "application/json",
      authorization: token,
    };

    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/authentication-node/check-login`,
        {
          method: "GET",
          headers: myheader,
        }
      );

      if (res.status !== 200) {
        setLoggedIn(false);
        localStorage.clear();
        navigate("/login", { replace: true });
      } else {
        setLoggedIn(true);
        if (localStorage.getItem("fb-auth-token")) {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar
        notify={props.notify}
        loggedIn={loggedIn}
        mode_color={props.mode_color}
        mode={props.mode}
        title={() => props.title("Connect")}
      />
      <div className="fb-login-btn">
        <FacebookLoginButton />
      </div>
    </>
  );
};
export default Connect;
