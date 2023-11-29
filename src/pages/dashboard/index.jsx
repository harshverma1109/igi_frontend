import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard(props) {
  const navigate = useNavigate();
  const [read, setRead] = useState(false);
  const [igMetric, setInsights] = useState({
    imp_week: 0,
    imp_month: 0,
    reach_month: 0,
    reach_week: 0,
  });
  const [infoBasic, setInfoBasic] = useState({
    followers_count: 0,
    follows_count: 0,
    id: "",
    ig_id: 0,
    media_count: 0,
    name: "",
    profile_picture_url: "",
    username: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    props.title("Dashboard");
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
      if (localStorage.getItem("fbAccessToken")) {
        if (!read) {
          insights();
        }
      }
    } else {
      setRead(false);
      navigate("/login", { replace: true });
    }
  }, [localStorage.getItem("appId")]);
  const insights = async () => {
    setRead(true);
    try {
      //GET FB LONG LIVE ACCESS TOKEN
      if (!localStorage.getItem("lvat")) {
        let data1 = await fetch(
          `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${localStorage.getItem(
            "appId"
          )}&client_secret=${localStorage.getItem(
            "appSecret"
          )}&fb_exchange_token=${localStorage.getItem("fbAccessToken")}`,
          {
            method: "GET",
          }
        );
        let response1 = await data1.json();
        //console.log(response1);
        if (response1.access_token)
          localStorage.setItem("lvat", response1.access_token);
        else throw new Error("Error getting long lived access token");
      }

      //GET FB ID
      let data2 = await fetch(
        `https://graph.facebook.com/v18.0/me?access_token=${localStorage.getItem(
          "lvat"
        )}`
      );
      let response2 = await data2.json();
      //console.log(response2);

      {
        /*//GET PAGE ID FROM PAGE USERNAME
      let data3 = await fetch(
        `https://graph.facebook.com/v12.0/${localStorage.getItem(
          "appPageName"
        )}?fields=id&access_token=${localStorage.getItem("lvat")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response3 = await data3.json();
      //console.log(response3);*/
      }

      //GET PAGE TOKEN
      let data4 = await fetch(
        `https://graph.facebook.com/v12.0/${localStorage.getItem(
          "appPageID"
        )}?fields=access_token&access_token=${localStorage.getItem("lvat")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response4 = await data4.json();
      //console.log(response4);

      //GET IG ACCOUNT
      let data5 = await fetch(
        `https://graph.facebook.com/v12.0/${localStorage.getItem(
          "appPageID"
        )}?fields=instagram_business_account&access_token=${
          response4.access_token
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response5 = await data5.json();
      //console.log(response5);
      //GET IG INSIGHTS

      //get impression for week
      let imp_data_week = await fetch(
        `https://graph.facebook.com/v18.0/${response5.instagram_business_account.id}/insights?metric= impressions&period=week&access_token=${response4.access_token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let imp_response_week = await imp_data_week.json();
      console.log(imp_response_week);
      if (imp_response_week.data) {
        let name = "",
          sum = 0;
        imp_response_week.data.forEach((data) => {
          name = data.name;
          data.values.forEach((item) => {
            sum = sum + item.value;
          });
        });
        //console.log(name+'_week' + "::" + sum);
        setInsights((prevData) => ({ ...prevData, imp_week: sum }));
      }
      //get impression for month
      let imp_data_month = await fetch(
        `https://graph.facebook.com/v18.0/${response5.instagram_business_account.id}/insights?metric= impressions&period=days_28&access_token=${response4.access_token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let imp_response_month = await imp_data_month.json();
      //console.log(imp_response_month);
      if (imp_response_month) {
        let name = "",
          sum = 0;
        imp_response_month.data.forEach((data) => {
          name = data.name;
          data.values.forEach((item) => {
            sum = sum + item.value;
          });
        });
        //console.log(name+'_month' + "::" + sum);
        setInsights((prevData) => ({ ...prevData, imp_month: sum }));
      }

      //get reach for week
      let reach_data_week = await fetch(
        `https://graph.facebook.com/v18.0/${response5.instagram_business_account.id}/insights?metric= reach&period=week&access_token=${response4.access_token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let reach_response_week = await reach_data_week.json();
      //console.log(reach_response_week);
      if (reach_response_week.data) {
        let name = "",
          sum = 0;
        reach_response_week.data.forEach((data) => {
          name = data.name;
          data.values.forEach((item) => {
            sum = sum + item.value;
          });
        });
        //console.log(name + "_week" + "::" + sum);
        setInsights((prevData) => ({ ...prevData, reach_week: sum }));
      }
      //get impression for month
      let reach_data_month = await fetch(
        `https://graph.facebook.com/v18.0/${response5.instagram_business_account.id}/insights?metric= reach&period=days_28&access_token=${response4.access_token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let reach_response_month = await reach_data_month.json();
      //console.log(reach_response_month);
      if (reach_response_month) {
        let name = "",
          sum = 0;
        reach_response_month.data.forEach((data) => {
          name = data.name;
          data.values.forEach((item) => {
            sum = sum + item.value;
          });
        });
        //console.log(name + "_month" + "::" + sum);
        setInsights((prevData) => ({ ...prevData, reach_month: sum }));
      }
      //GET SOME BASIC INFO OF THE IG USER
      let basic_info = await fetch(
        `https://graph.facebook.com/v18.0/${response5.instagram_business_account.id}?fields=id,username,media_count,follows_count,followers_count,ig_id,name,profile_picture_url&access_token=${response4.access_token}`,
        {
          method: "GET",
        }
      );
      let basic_info_res = await basic_info.json();
      //console.log("basic info::", basic_info_res);
      setInfoBasic({
        followers_count: basic_info_res.followers_count,
        follows_count: basic_info_res.follows_count,
        id: basic_info_res.id,
        ig_id: basic_info_res.ig_id,
        media_count: basic_info_res.media_count,
        name: basic_info_res.name,
        profile_picture_url: basic_info_res.profile_picture_url,
        username: basic_info_res.username,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <>
      <Navbar
        notify={props.notify}
        loggedIn={loggedIn}
        mode_color={props.mode_color}
        mode={props.mode}
        title={() => props.title("Dashboard")}
      />
      <div className="row" style={{ marginLeft: "9%", marginBottom: "9%" }}>
        <div className="col-6 col-sm-4 mt-5">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={infoBasic.profile_picture_url}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">IG Profile</h5>
              <p className="card-text">Username:{infoBasic.username}</p>
              <p className="card-text">Name:{infoBasic.name}</p>
              <p className="card-text">
                Follwers Count:{infoBasic.followers_count}
              </p>
              <p className="card-text">
                Follows Count:{infoBasic.follows_count}
              </p>
              <p className="card-text">ID:{infoBasic.id}</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-4 mt-5">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Impressions : Week</h5>
              <p className="card-text">{igMetric.imp_week}</p>
            </div>
          </div>
          <div className="card mt-5" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Reach : Week</h5>
              <p className="card-text">{igMetric.reach_week}</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-4 mt-5">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Impressions : Month</h5>
              <p className="card-text">{igMetric.imp_month}</p>
            </div>
          </div>
          <div className="card mt-5" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Reach : Month</h5>
              <p className="card-text">{igMetric.reach_month}</p>
            </div>
          </div>
        </div>
        <div className="w-100 d-none d-md-block"></div>
      </div>
      <div></div>
    </>
  );
}
