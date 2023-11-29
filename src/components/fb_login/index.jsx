import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";

const FacebookLoginButton = () => {
  const navigate = useNavigate();
  const [requireInput, setRequireInput] = useState(false);
  const [inputData, setInput] = useState({
    appId: "",
    appSecret: "",
    pageId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", inputData);
    if (inputData.appId && inputData.appSecret && inputData.pageId) {
      alert("submitted successfully");
      localStorage.setItem("appId", inputData.appId);
      localStorage.setItem("appSecret", inputData.appSecret);
      localStorage.setItem("appPageID", inputData.pageId);
      setRequireInput(true);
      fetch(process.env.REACT_APP_API_URL + "/setFBTokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appId: localStorage.getItem("appId"),
          appSecret: localStorage.getItem("appSecret"),
        }),
      });
    }
  };
  const responseFacebook = (response) => {
    console.log("Facebook login response:", response);
    if (response.accessToken) {
      localStorage.setItem("fbAccessToken", response.accessToken);
      // Fetch the user's Pages
      // fetch(
      //   `https://graph.facebook.com/v18.0/me/accounts?access_token=${response.accessToken}`
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("User Pages:", data.data);
      //     // Handle the list of Pages here
      //   })
      //   .catch((error) => console.error("Error fetching Pages:", error));
      navigate("/dashboard");
    } else {
      // Handle the case where the access token is not available
      console.log("Access token not available.");
    }
  };

  return (
    <>
      <div style={{ height: "100px" }} className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="appId">APP ID *</label>
              <input
                type="text"
                className="form-control"
                id="appId"
                name="appId"
                value={inputData.appId}
                onChange={(e) => {
                  setInput((preventInput) => ({
                    ...preventInput,
                    [e.target.name]: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="appSecret">APP SECRET *</label>
              <input
                type="text"
                className="form-control"
                id="appSecret"
                name="appSecret"
                value={inputData.appSecret}
                onChange={(e) => {
                  setInput((preventInput) => ({
                    ...preventInput,
                    [e.target.name]: e.target.value,
                  }));
                }}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="pageId">PAGE ID *</label>
              <input
                type="text"
                className="form-control"
                id="pageId"
                name="pageId"
                value={inputData.pageId}
                onChange={(e) => {
                  setInput((preventInput) => ({
                    ...preventInput,
                    [e.target.name]: e.target.value,
                  }));
                }}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
      {requireInput ? (
        <>
          <ul style={{ color: "red", listStyle: "none" }}>
            Note:
            <li>
              1.Please login only using from the fb account you used to create
              the fb app.
            </li>
            <li>2.select the correct ig accounts and pages.</li>
            <li>3.select the correct ig accounts and pages.</li>
            <li>
              4.Allow all the permissions so that you dont face any issues.
            </li>
          </ul>
          <FacebookLogin
            appId={localStorage.getItem("appId")}
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,email,pages_show_list,instagram_basic,pages_read_engagement,read_insights,pages_manage_engagement,ads_read,instagram_manage_insights"
            callback={responseFacebook}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FacebookLoginButton;
