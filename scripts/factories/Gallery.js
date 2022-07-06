import RecipeCard from "./RecipeFactory.js";

class Gallery {
  constructor(recipe) {
    this.recipe = recipe

    this.filteredRecipe = this.recipe.filter(recipe => recipe.id <= 50)
  }

  render () {
    const gallery = document.querySelector('#recipes-container')
    gallery.innerHTML = ''

    this.filteredRecipe.forEach((recipe) => {
      const recipesCard = new RecipeCard(recipe)
      gallery.innerHTML += recipesCard.render()
    });
  }
}

export default Gallery