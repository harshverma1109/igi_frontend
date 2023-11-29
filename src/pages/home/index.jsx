import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    props.title("Home");
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <>
      <Navbar
        notify={props.notify}
        loggedIn={loggedIn}
        mode={props.mode}
        mode_color={props.mode_color}
        title={() => props.title("Home")}
      />
    </>
  );
}

export default Home;
