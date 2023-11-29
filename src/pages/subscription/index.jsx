import React, { Component } from "react";
import Navbar from "../../components/navbar/Navbar";
export default class Subscription extends Component {
  constructor() {
    super();
    console.log("working fine");
  }
  render() {
    let { notify, loggedIn, mode_color, mode, title } = this.props;
    return (
      <>
        <Navbar
          notify={notify}
          loggedIn={loggedIn}
          mode_color={mode_color}
          mode={mode}
          title={() => title.title("Subscription")}
        />
      </>
    );
  }
}
