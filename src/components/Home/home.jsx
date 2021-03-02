import React, { useEffect, useState } from "react";
import Nav from "./../common/Nav/nav";
import "./home.css";
import Footer from "./../common/Footer/footer";
import httpClient from "./../../utils/httpClient";
import notify from "./../../utils/notify";
import { QuizStateContext } from "./../../context/context";
import Category from "./../Category/category";
import Level from "./../Level/level";
import Quiz from "./../quiz/quiz";
function Home() {
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState([]);
  const [gameState, setGameState] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    //fetch user name
    const u = localStorage.getItem("user");
    setUser(JSON.parse(u).name);
    //fetch categories
    httpClient
      .GET("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        notify.handleError(err);
      })
      .finally(() => {
        //
      });
  }, []);

  return (
    <>
      <Nav username={user}></Nav>
      <div className="wrapper">
        <QuizStateContext.Provider
          value={{
            gameState,
            setGameState,
            selectedCategory,
            setSelectedCategory,
          }}
        >
          {gameState === "category" && <Category categories={categories} />}
          {gameState === "level" && <Level />}
          {gameState === "playing" && <Quiz />}
          {gameState === "finished" && <Category categories={categories} />}
          {/* {gameState === "finished" && <EndScreen />} */}
        </QuizStateContext.Provider>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
