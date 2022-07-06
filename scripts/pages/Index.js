import recipes from "../data/recipes.js";
import Gallery from "../factories/Gallery.js"

async function init() {
  const recipesData = recipes
  const recipesList = new Gallery(recipesData)
  recipesList.render()
};

init()