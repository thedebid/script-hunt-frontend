import React, { useContext, useEffect, useState } from "react";
import { QuizStateContext } from "./../../context/context";
import httpClient from "./../../utils/httpClient";
import notify from "./../../utils/notify";
import "./level.css";
function Level(props) {
  const {
    user,
    setGameState,
    selectedCategory,
    setSelectedCategory,
    setPassedQuestions,
    setSelectedLevel,
  } = useContext(QuizStateContext);

  const [level, setLevel] = useState([]);
  const [levelStatus, setLevelStatus] = useState([]);

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
    //fetch level history
    httpClient
      .GET("/level/history", true, {
        uid: user._id,
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

  //back to category
  function BackToCat() {
    setSelectedCategory();
    setGameState("category");
  }

  //check level weather locked or unlocked
  function getStatus(level, sts, i) {
    // console.log(level);
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
                      setSelectedLevel(item.name);
                      setPassedQuestions(0);
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
