import "../../css/common.css";

function Forgot_password() {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Forgot Password?</span>
        </div>
        <form action="#">
          <div className="row">
            <i className="fas fa-user"></i>
            <input type="email" placeholder="Email" required />
          </div>
          <div className="row button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgot_password;
