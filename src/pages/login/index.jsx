import "../../css/common.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";

function Login(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log(email, password);
    make_login();
  };

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    props.title("Login");
    let token = localStorage.getItem("token");
    let myheader = { "Content-Type": "application/json", authorization: token };
    if (token) {
      fetch(
        `${process.env.REACT_APP_API_URL}/authentication-node/check-login`,
        {
          method: "GET",
          headers: myheader,
        }
      )
        .then(async (res) => {
          let resp = await res.json();
          console.log(resp);
          if (res.status !== 200) {
            setLoggedIn(false);
            localStorage.clear();
          } else {
            setLoggedIn(true);
            navigate("/connect", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const make_login = () => {
    fetch(`${process.env.REACT_APP_API_URL}/authentication-node/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(async (res) => {
        let resp = await res.json();
        console.log(resp);
        if (res.status === 200) {
          (function () {
            props.notify({ msg: "Login Successfull.", status: "Success" });
          })();
          localStorage.setItem("token", resp.token);
          navigate("/connect", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        notify={props.notify}
        mode={props.mode}
        mode_color={props.mode_color}
      />
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Login Form</span>
          </div>
          <form onSubmit={handleSubmit2}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="pass">
              <Link to="/forgot_password">Forgot password?</Link>
            </div>
            <div className="row button">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member? <Link to="/sign_up">Signup now</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
