import React, { Component } from "react";
import "../auth.css";
import { Link } from "react-router-dom";
const defualtForm = {
  name: "",
  email: "",
  password: "",
};
class Register extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...defualtForm,
      },
      error: {
        ...defualtForm,
      },
      isSubmitting: false,
      isValidForm: false,
    };
  }

  render() {
    return (
      <div className="wrappe">
        <div className="signupscreen">
          <div className="SignUp">
            <div className="row">
              <p className="loginHeading">Signup to Script Hunt</p>
            </div>
            <form method="POST">
              <div className="row usermail">
                <label htmlFor="usermail">E-mail</label><br/>
                <input type="email" name="usermail" id="usermail" required />
              </div>
              <div className="row username">
                <label htmlFor="username">Username</label><br/>
                <input type="text" name="username" id="username" required />
              </div>
              <div className="row password">
                <label htmlFor="password">Password</label><br/>
                <input type="password" name="password" id="password" required />
              </div>
              <div className="row loginButtonRow">
                <input
                  type="submit"
                  value="Sign Up"
                  className="signupButton button"
                />
              </div>
            </form>
            <div className="row registerRow">
              <hr />

              <p className="reg-p">
                {" "}
                Already have an account?{" "}
                <Link to="/login" className="clicked-login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
