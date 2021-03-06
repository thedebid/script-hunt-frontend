import React, { useContext } from "react";
import { QuizStateContext } from "./../../context/context";

function Category(props) {
  const { setGameState, setSelectedCategory } = useContext(QuizStateContext);

  function selectLevel(categoryName) {
    setSelectedCategory(categoryName);
    setGameState("level");
  }
  return (
    <>
      <div>
        <h3 className="heading_category">Game Category</h3>
      </div>
      <div className="wrapper-category">
        <div className="games_category">
          {props.categories.map((item, i) => (
            <div className="category" key={item._id}>
              <i className={"devicon-" + item.icon + "-plain"}></i>
              <div className="category_btn">
                <input
                  type="button"
                  value={item.name}
                  className="button buttonhtml"
                  onClick={() => {
                    selectLevel(item.name);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
