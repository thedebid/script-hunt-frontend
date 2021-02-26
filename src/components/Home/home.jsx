import React, { Component } from "react";
import Nav from "./../common/Nav/nav";
import "./home.css";
import Footer from "./../common/Footer/footer";
import Category from "./../Category/category";

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
        <Category></Category>
        <Footer></Footer>
      </div>
    );
  }
}
export default Home;
