import React from "react";
import "../auth.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import notify from "./../../../utils/notify";
import httpClient from "./../../../utils/httpClient";
function Register() {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  const onLogin = (data) => {
    httpClient
      .POST("/user/register", data)
      .then((response) => {
        notify.showSuccess(response.data.message);
        history.push("/login");
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
      <div className="signupscreen">
        <div className="SignUp">
          <div className="row">
            <p className="loginHeading">Signup to Script Hunt</p>
          </div>
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="row name">
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                ref={register({ required: true })}
                style={errors.name ? errorStyle : {}}
              />
            </div>{" "}
            {errors.name && (
              <span className="error">This field is required</span>
            )}
            <div className="row usermail">
              <label htmlFor="usermail">E-mail</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                ref={register({ required: true })}
                style={errors.email ? errorStyle : {}}
              />
            </div>{" "}
            {errors.email && (
              <span className="error">This field is required</span>
            )}
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
            </div>
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
            </div>
            {errors.password && (
              <span className="error">This field is required</span>
            )}
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

export default Register;
