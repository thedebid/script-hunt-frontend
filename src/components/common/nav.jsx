import React from "react";
import "./nav.css";
import { useHistory } from "react-router-dom";
function Nav(props) {
  let history = useHistory();
  function logout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="nav-bar">
      <nav>
        <ul>
          <a href="/">
            <li className="logo">
              <span>&lt;/&gt;</span> Script Hunt
            </li>
          </a>
          <ul className="nav_links">
            <li className="player_name">{props.username}</li>
            <button className="user_profile logout" onClick={logout}>
              <li>Log out</li>
            </button>
          </ul>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
