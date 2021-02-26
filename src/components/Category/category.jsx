import React from "react";

function Category() {
  return (
    <>
      <div>
        <h3 class="heading_category">Game Category</h3>
      </div>
      <div class="wrapper-category">
        <div class="games_category">
          <div class="category">
            <i class="devicon-html5-plain"></i>
            <div class="category_btn">
              <input type="button" value="HTML 5" class="button buttonhtml" />
            </div>
          </div>
          <div class="category">
            <i class="devicon-css3-plain"></i>
            <div class="category_btn">
              <input type="button" value="CSS 3" class="button" />
            </div>
          </div>
          <div class="category">
            <i class="devicon-javascript-plain"></i>
            <div class="category_btn">
              <input type="button" value="JavaScript" class="button" />
            </div>
          </div>
          <div class="category">
            <i class="devicon-java-plain"></i>
            <div class="category_btn">
              <input type="button" value="Java" class="button" />
            </div>
          </div>
          <div class="category">
            <i class="devicon-react-plain"></i>
            <div class="category_btn">
              <input type="button" value="React" class="button" />
            </div>
          </div>
          <div class="category">
            <i class="devicon-mongodb-plain"></i>
            <div class="category_btn">
              <input type="button" value="MongoDB" class="button" />
            </div>
          </div>
          <div class="category">
            <i class="devicon-nodejs-plain"></i>
            <div class="category_btn">
              <input type="button" value="Node JS" class="button" />
            </div>
          </div>
          <div class="category">
            <i class="devicon-typescript-plain"></i>
            <div class="category_btn">
              <input type="button" value="Typescript" class="button" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
