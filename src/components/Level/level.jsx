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
  const [levelStatus, setLevelStatus] = useState([]);
  useEffect(() => {
    const u = localStorage.getItem("user");
    const uid = JSON.parse(u)._id;

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

    httpClient
      .GET("/level/history", true, {
        uid: uid,
        cid: selectedCategory,
      })
      .then((response) => {
        setLevelStatus(response.data);
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
  function getStatus(level, sts, i) {
    if (i === 0) {
      return "Unlocked";
    }
    let a = sts.find((i) => {
      if (level._id === i.lid) {
        return i.status;
      }
    });
    if (typeof a === "object") {
      return a.status;
    }
  }
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
                {getStatus(item, levelStatus, i) === "Unlocked" ? (
                  <input
                    type="button"
                    value="Play"
                    className="button"
                    onClick={() => {
                      localStorage.setItem("levelId", JSON.stringify(item._id));
                      localStorage.setItem("level", JSON.stringify(item.name));

                      //console.log(item.name);
                      // setSelectedLevel(item.name);
                      setGameState("playing");
                    }}
                  />
                ) : (
                  <input
                    type="button"
                    value="Play"
                    className="button"
                    disabled
                  />
                )}
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
