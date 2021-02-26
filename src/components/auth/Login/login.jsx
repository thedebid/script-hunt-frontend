import React, { useState } from "react";
import "../auth.css";
import httpClient from "./../../../utils/httpClient";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import notify from "./../../../utils/notify";
const initialState = {
  username: "debid11",
  password: "12345",
};
function Login() {
  let history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const login = () => {
    const userData = {
      ...formData,
    };
    httpClient
      .POST("/user/login", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLoggedIn", true);
        history.replace("/");
      })
      .catch((err) => {
        console.log(err.response);
        notify.handleError(err);
      })
      .finally(() => {
        //
      });
  };

  return (
    <div className="wrappe">
      <div className="startScreen">
        <div className="startScreenLoginArea">
          <div className="row">
            <p className="loginHeading">Login to Script Hunt</p>
          </div>

          <div className="row username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div className="row password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="row loginButtonRow">
            <button
              className="loginButton button button-primary"
              onClick={login}
            >
              Login
            </button>
          </div>

          <div className="row registerRow">
            <hr />

            <p className="reg-p">
              No Account? <Link to="/register">Register </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
