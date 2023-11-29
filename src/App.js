import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/index";
import SignUp from "./pages/signup/index";
import ForgotPassword from "./pages/forgot_password/index";
import NotFound from "./pages/not_found/index";
import Home from "./pages/home/index";
import Dashboard from "./pages/dashboard";
import Connect from "./pages/connnect";
import Profile from "./pages/profile";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Subscription from "./pages/subscription/index";

toast.configure({
  autoClose: 5000,
  draggable: false,
  //etc you get the idea
});

function App() {
  const [color, setColor] = useState("body-tertiary");
  const mode_color = (data) => {
    setColor(data);
    document.getElementById("background").style.backgroundColor = data;
    notify({ msg: `Enabled ${data} color Mode`, status: "Success" });
  };

  const change_title = (data) => {
    document.title = "IGI - " + data;
  };

  /*const [mode, setMode] = useState("body-tertiary");*/
  const notify = (data) => {
    console.log(data);
    if (data.status === "Success") {
      toast.success(data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (data.status === "Failure") {
      toast.error(data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              notify={notify}
              title={change_title}
              mode={color}
              mode_color={mode_color}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              notify={notify}
              title={change_title}
              mode={color}
              mode_color={mode_color}
            />
          }
        ></Route>
        <Route
          path="/sign_up"
          element={
            <SignUp
              notify={notify}
              title={change_title}
              mode={color}
              mode_color={mode_color}
            />
          }
        ></Route>
        <Route
          path="/forgot_password"
          element={
            <ForgotPassword
              title={change_title}
              mode={color}
              mode_color={mode_color}
            />
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              mode={color}
              title={change_title}
              notify={notify}
              mode_color={mode_color}
            />
          }
        ></Route>
        <Route
          path="/subscription"
          element={
            <Subscription
              mode={color}
              title={change_title}
              notify={notify}
              mode_color={mode_color}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <Profile
              mode={color}
              title={change_title}
              notify={notify}
              mode_color={mode_color}
            />
          }
        ></Route>
        <Route
          path="/connect"
          element={
            <Connect
              title={change_title}
              mode={color}
              notify={notify}
              mode_color={mode_color}
            />
          }
        ></Route>
        <Route path="*" element={<NotFound mode_color={mode_color} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
