import { useState, useContext } from "react";
import { QuizStateContext } from "./../../../context/context";
import httpClient from "./../../../utils/httpClient";
import notify from "./../../../utils/notify";

function Questions({ questions }) {
  const { score, setScore, setGameState, selectedCategory } = useContext(
    QuizStateContext
  );
  const selectedLevel = JSON.parse(localStorage.getItem("level"));
  const [optionChosen, setOptionChosen] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerState, setAnswerState] = useState("unSelected");

  const nextQuestion = () => {
    if (questions[currentQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    if (questions[currentQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
    setGameState("finished");
  };
  const chooseOption = (option) => {
    httpClient
      .GET("/question/checkAnswer/" + questions[currentQuestion]._id, true, {
        answer: option,
      })
      .then((response) => {
        setAnswerState(response.data.message);
        if (response.data.message === "Wrong Answer")
          notify.showWarning(response.data.message);
        if (response.data.message === "Correct Answer")
          notify.showSuccess(response.data.message);
      })
      .catch((err) => {
        notify.handleError(err);
      })
      .finally(() => {
        //
      });
  };
  console.log(questions.length);

  return (
    <>
      {questions.length > 0 ? (
        <>
          <div className="heading">
            <div>
              {selectedCategory} - {selectedLevel}
            </div>

            <div>
              Question - {currentQuestion + 1 + " / " + questions.length}
            </div>
          </div>
          <hr />
          <div className="question-box">
            <div className="question">{questions[currentQuestion]?.title}</div>
          </div>
          <div className="quiz-choices">
            <button
              className={
                answerState === "unSelected"
                  ? "quiz-choice btn"
                  : answerState === "Correct Answer"
                  ? "quiz-choice btn quiz-choice-correct"
                  : "quiz-choice btn quiz-choice-wrong"
              }
              onClick={() => {
                chooseOption(0);
              }}
            >
              {questions[currentQuestion]?.answers?.[0]}
            </button>
            <button
              className={
                answerState === "unSelected"
                  ? "quiz-choice btn"
                  : answerState === "Correct Answer"
                  ? "quiz-choice btn quiz-choice-correct"
                  : "quiz-choice btn quiz-choice-wrong"
              }
              onClick={() => {
                chooseOption(1);
              }}
            >
              {questions[currentQuestion]?.answers?.[1]}
            </button>
            <button
              className={
                answerState === "unSelected"
                  ? "quiz-choice btn"
                  : answerState === "Correct Answer"
                  ? "quiz-choice btn quiz-choice-correct"
                  : "quiz-choice btn quiz-choice-wrong"
              }
              onClick={() => {
                chooseOption(2);
              }}
            >
              {questions[currentQuestion]?.answers?.[2]}
            </button>
            <button
              className={
                answerState === "unSelected"
                  ? "quiz-choice btn"
                  : answerState === "Correct Answer"
                  ? "quiz-choice btn quiz-choice-correct"
                  : "quiz-choice btn quiz-choice-wrong"
              }
              onClick={() => {
                chooseOption(3);
              }}
            >
              {questions[currentQuestion]?.answers?.[3]}
            </button>
          </div>
          <hr />
          <div className="quiz-navigation">
            <button className="show-answer btn">Show Answer</button>

            {currentQuestion == questions.length - 1 ? (
              <button onClick={finishQuiz} id="next-question btn">
                Finish Quiz
              </button>
            ) : (
              <button onClick={nextQuestion} id="next-question btn">
                Next Question
              </button>
            )}
          </div>{" "}
        </>
      ) : (
        <>
          <div className="heading">
            <div>
              {selectedCategory} - {selectedLevel}
            </div>
            <div>Question not found</div>
          </div>
          <hr />{" "}
          <div className="quiz-navigation">
            <button
              className="show-answer btn"
              onClick={() => {
                setGameState("level");
              }}
            >
              Back
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Questions;
