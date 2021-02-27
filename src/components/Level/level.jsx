import React, { useContext, useEffect, useState } from "react";
import { QuizStateContext } from "./../../context/context";
import httpClient from "./../../utils/httpClient";
import notify from "./../../utils/notify";

import "./level.css";
function Level(props) {
  const {
    gameState,
    setGameState,
    selectedCategory,
    setSelectedCategory,
  } = useContext(QuizStateContext);

  const [level, setLevel] = useState([]);

  useEffect(() => {
    //fetch level
    httpClient
      .GET("/level", true, { category: selectedCategory })
      .then((response) => {
        setLevel(response.data);
      })
      .catch((err) => {
        notify.handleError(err);
      })
      .finally(() => {
        //
      });
  }, []);
  function BackToCat() {
    setSelectedCategory();
    setGameState("category");
  }
  console.log(level);
  return (
    <>
      <div className="wrapper-level">
        <div className="heading">
          <h3>Levels</h3>
        </div>
        <div className="levels-grid">
          {level.map((item, i) => (
            <div className="level-category" key={item._id}>
              <p className="level-title">{item.name}</p>
              <div className="category_btn">
                <input type="button" value="Play" className="button" />
              </div>
            </div>
          ))}
        </div>
        <div className="back-to-category">
          <div className="category_btn">
            <input
              type="button"
              value="Back"
              className="button"
              onClick={BackToCat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Level;
