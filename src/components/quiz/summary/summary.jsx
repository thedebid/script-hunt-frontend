import "./summary.css";
import { useContext, useState } from "react";
import { QuizStateContext } from "../../../context/context";
import httpClient from "./../../../utils/httpClient";
import notify from "./../../../utils/notify";

function Summary() {
  const {
    user,
    setGameState,
    passedQuestions,
    totalQuestions,
    selectedCategory,
    selectedLevel,
  } = useContext(QuizStateContext);

  if (passedQuestions === totalQuestions) {
    const data = {
      uid: user._id,
      category: selectedCategory,
      level: selectedLevel,
      status: "Unlocked",
    };
    httpClient
      .POST("/level/history", data, true)
      .then((response) => {
        console.log("Next level unlocked");
      })
      .catch((err) => {
        notify.handleError(err);
      })
      .finally(() => {
        //
      });
  }
  return (
    <div className="wrapper-summary">
      <div className="sub-wrapper-summary">
        <div className="summary-heading">
          <div>Quiz Summary</div>
        </div>
        <hr />
        <div className="quiz-summary-icon">
          <i className="fas fa-thumbs-up"></i>
        </div>
        <div className="summary-summary">
          <p className="quiz-summary">
            Congratulations, you have scored {passedQuestions} /{" "}
            {totalQuestions} in this quiz.
          </p>
        </div>
        <div className="after-quiz-summary">
          {totalQuestions === passedQuestions ? (
            <div className="quiz-passed-summary">
              <p>Wow, Next level has been unlocked.</p>
            </div>
          ) : (
            <div className="quiz-not-passed-summary">
              <p>
                {" "}
                To advance to next level please answer all the questions
                correctly
              </p>
            </div>
          )}
        </div>
        <div className="after-quiz-navigation">
          <button
            className="show-category btn"
            onClick={() => {
              setGameState("category");
            }}
          >
            Go to Category
          </button>
          <button
            className="show-level btn"
            onClick={() => {
              setGameState("level");
            }}
          >
            Go to Levels
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
