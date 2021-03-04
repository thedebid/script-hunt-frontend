import { useState, useContext, useRef } from "react";
import { QuizStateContext } from "../../../context/context";
import httpClient from "../../../utils/httpClient";
import notify from "../../../utils/notify";

function Questions({ questions }) {
  const {
    setGameState,
    selectedCategory,
    passedQuestions,
    setPassedQuestions,
    selectedLevel,
  } = useContext(QuizStateContext);

  //  const selectedLevel = JSON.parse(localStorage.getItem("level"));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerState, setAnswerState] = useState("unSelected");
  const btn1Status = useRef();
  const btn2Status = useRef();
  const btn3Status = useRef();
  const btn4Status = useRef();

  function nextQuestion() {
    //Enable answer button on next questions
    btn1Status.current.disabled = false;
    btn2Status.current.disabled = false;
    btn3Status.current.disabled = false;
    btn4Status.current.disabled = false;
    setCurrentQuestion(currentQuestion + 1);
  }
  //Finish Quiz
  const finishQuiz = () => {
    setGameState("finished");
  };
  const chooseOption = (option) => {
    //Disable other answers
    switch (option) {
      case 0:
        //Disable except first button
        btn2Status.current.disabled = true;
        btn3Status.current.disabled = true;
        btn4Status.current.disabled = true;
        break;
      case 1:
        //Disable except second button
        btn1Status.current.disabled = true;
        btn3Status.current.disabled = true;
        btn4Status.current.disabled = true;
        break;
      case 2:
        //Disable except third button
        btn1Status.current.disabled = true;
        btn2Status.current.disabled = true;
        btn4Status.current.disabled = true;
        break;
      case 3:
        //Disable except fourth button
        btn1Status.current.disabled = true;
        btn2Status.current.disabled = true;
        btn3Status.current.disabled = true;
        break;
      default:
    }

    //Check Answer
    httpClient
      .GET("/question/checkAnswer/" + questions[currentQuestion]._id, true, {
        answer: option,
      })
      .then((response) => {
        setAnswerState(response.data.message);
        if (response.data.message === "Wrong Answer")
          notify.showWarning(response.data.message);
        if (response.data.message === "Correct Answer") {
          setPassedQuestions(passedQuestions + 1);
          notify.showSuccess(response.data.message);
        }
      })
      .catch((err) => {
        notify.handleError(err);
      })
      .finally(() => {
        //
      });
  };
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
              ref={btn1Status}
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
              ref={btn2Status}
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
              ref={btn3Status}
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
              ref={btn4Status}
            >
              {questions[currentQuestion]?.answers?.[3]}
            </button>
          </div>
          <hr />
          <div className="quiz-navigation">
            <button className="show-answer btn">Show Answer</button>

            {currentQuestion === questions.length - 1 ? (
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
