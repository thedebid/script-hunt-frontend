import React, { Component } from "react";
import Nav from "./../common/nav";
import "./home.css";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
    };
  }
  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({
      user: JSON.parse(user),
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Nav username={this.state.user.name}></Nav>
      </div>
    );
  }
}
export default Home;
