import "./quiz.css";
import { useState, useContext, useEffect } from "react";
import { QuizStateContext } from "./../../context/context";
import httpClient from "./../../utils/httpClient";
import notify from "./../../utils/notify";
import Questions from "./Question/question";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const { selectedCategory } = useContext(QuizStateContext);

  useEffect(() => {
    const selectedLevelId = JSON.parse(localStorage.getItem("levelId"));

    httpClient
      .GET("/question", true, {
        category: selectedCategory,
        level: selectedLevelId,
      })
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((err) => {
        notify.handleError(err);
      })
      .finally(() => {
        //
      });
  }, []);

  return (
    <div className="wrapper-for-playing-screen">
      <div className="sub-wrapper">
        {questions && <Questions questions={questions} />}
      </div>
    </div>
  );
}

export default Quiz;
