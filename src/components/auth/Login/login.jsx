import React from "react";
import "../auth.css";
import httpClient from "./../../../utils/httpClient";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import notify from "./../../../utils/notify";

import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  const onLogin = (data) => {
    httpClient
      .POST("/user/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLoggedIn", true);
        history.replace("/");
      })
      .catch((err) => {
        notify.handleError(err);
      })
      .finally(() => {
        //
      });
  };

  //in line css for error field
  let errorStyle = {
    border: "1px solid rgb(191, 22, 80)",
    background: "rgb(251, 236, 242)",
  };

  return (
    <div className="wrappe">
      <div className="startScreen">
        <div className="startScreenLoginArea">
          <div className="row">
            <p className="loginHeading">Login to Script Hunt</p>
          </div>
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="row username">
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                name="username"
                id="username"
                ref={register({ required: true })}
                style={errors.username ? errorStyle : {}}
              />
            </div>{" "}
            {errors.username && (
              <span className="error">This field is required</span>
            )}
            <div className="row password">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                ref={register({ required: true })}
                style={errors.password ? errorStyle : {}}
              />
            </div>{" "}
            {errors.password && (
              <span className="error">This field is required</span>
            )}
            <div className="row loginButtonRow">
              <input
                type="submit"
                className="loginButton button button-primary"
                value="Login"
              ></input>
            </div>
          </form>
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
