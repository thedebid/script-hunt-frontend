import "./quiz.css";
import { useState, useContext, useEffect } from "react";
import { QuizStateContext } from "./../../context/context";
import httpClient from "./../../utils/httpClient";
import notify from "./../../utils/notify";
import Questions from "./question/question";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const { selectedCategory, setTotalQuestions, selectedLevel } = useContext(
    QuizStateContext
  );

  useEffect(() => {
    //  const selectedLevelId = JSON.parse(localStorage.getItem("levelId"));

    httpClient
      .GET("/question", true, {
        category: selectedCategory,
        level: selectedLevel,
      })
      .then((response) => {
        setTotalQuestions(response.data.length);
        setQuestions(response.data);
        // console.log(response.data);
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
