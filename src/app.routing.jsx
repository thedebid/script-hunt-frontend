import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/auth/Login/login";
import Register from "./components/auth/Register/register";
import Home from "./components/home/home";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        localStorage.getItem("isLoggedIn") ? (
          <>
            <Component {...routeProps}></Component>
          </>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <>
          <div className="main_div">
            <Component {...routeProps}></Component>
          </div>
        </>
      )}
    ></Route>
  );
};

export const AppRouting = (props) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Home}></ProtectedRoute>
          <PublicRoute path="/register" component={Register}></PublicRoute>
          <PublicRoute path="/login" component={Login}></PublicRoute>
          <ProtectedRoute path="/home" component={Home}></ProtectedRoute>
          {/* <PublicRoute
            path="/forgot_password"
            component={ForgotPassword}
          ></PublicRoute>
          <PublicRoute
            path="/reset_password/:id"
            component={ResetPassword}
          ></PublicRoute> */}
          {/* <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
          ></ProtectedRoute> */}
          {/* <ProtectedRoute
            path="/add_product"
            component={AddProduct}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/view_product"
            component={ViewProduct}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/edit_product/:id"
            component={EditProduct}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/messages"
            component={MessageComponent}
          ></ProtectedRoute>
          <PublicRoute
            path="/search_product"
            component={SearchProduct}
          ></PublicRoute>
          <PublicRoute component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
};
