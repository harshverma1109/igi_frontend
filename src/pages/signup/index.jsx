import "../../css/common.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    props.title("Sign Up");
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
            navigate("/dashboard", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPass) {
      console.log(name, email, password, confirmPass);
      if (password === confirmPass) {
        fetch(`${process.env.REACT_APP_API_URL}/authentication-node/sign_up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            confirmPass: confirmPass,
          }),
        })
          .then(async (data) => {
            props.notify({ msg: "signed_up successfully.", status: "Success" });
            navigate("/login", "replace");
            console.log(await data.json());
          })
          .catch((err) => {
            console.error(err);
          });
      } else alert("Passwords and confirm password do not match");
    }
  };

  return (
    <>
      <Navbar
        mode_color={props.mode_color}
        loggedIn={loggedIn}
        mode={props.mode}
      />
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Sign Up Form</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                onChange={(e) => setName(e.target.value)}
                className="name"
                value={name}
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="email"
                value={email}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="password"
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                onChange={(e) => setConfirmPass(e.target.value)}
                className="confirm_pass"
                value={confirmPass}
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="row button">
              <input type="submit" value="Sign up" />
            </div>
            <div className="signin-link">
              Already a member? <Link to="/login">Sign in here</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
