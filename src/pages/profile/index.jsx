import "../profile/style.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";

function Profile(props) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    props.title("Profile");
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
            navigate("/login", { replace: true });
          } else {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login", { replace: true });
    }
  });

  return (
    <>
      <Navbar
        notify={props.notify}
        loggedIn={loggedIn}
        mode_color={props.mode_color}
        mode={props.mode}
      />
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        {" "}
        <div className="card p-4">
          {" "}
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            {" "}
            <button className="btn btn-secondary">
              {" "}
              <img
                src="https://i.imgur.com/wvxPV9S.png"
                height="100"
                width="100"
              />
            </button>{" "}
            <span className="name mt-3">Eleanor Pena</span>{" "}
            <span className="idd">@eleanorpena</span>{" "}
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              {" "}
              <span className="idd1">Oxc4c16a645_b21a</span>{" "}
              <span>
                <i className="fa fa-copy"></i>
              </span>{" "}
            </div>{" "}
            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
              {" "}
              <span className="number">
                1069 <span className="follow">Followers</span>
              </span>{" "}
            </div>{" "}
            <div className=" d-flex mt-2">
              {" "}
              <button className="btn1 btn-dark">Edit Profile</button>{" "}
            </div>{" "}
            <div className="text mt-3">
              {" "}
              <span>
                Eleanor Pena is a creator of minimalistic x bold graphics and
                digital artwork.
                <br />
                <br /> Artist/ Creative Director by Day #NFT minting@ with FND
                night.{" "}
              </span>{" "}
            </div>{" "}
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              {" "}
              <span>
                <i className="fa fa-twitter"></i>
              </span>{" "}
              <span>
                <i className="fa fa-facebook-f"></i>
              </span>{" "}
              <span>
                <i className="fa fa-instagram"></i>
              </span>{" "}
              <span>
                <i className="fa fa-linkedin"></i>
              </span>{" "}
            </div>{" "}
            <div className=" px-2 rounded mt-4 date ">
              {" "}
              <span className="join">Joined May,2021</span>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default Profile;
