import RecipeCard from './RecipeCard.js'

class Gallery {
  constructor (recipe, filteredRecipe) {
    this.recipe = recipe
    this.filteredRecipe = filteredRecipe
  }

  render (recipesArray) {
    const galleryContainer = document.querySelector('#recipes-container')
    if (recipesArray.length === 0) {
      const errorMessage =
      `
        <p class="noresultmessage">Aucune recette ne correspond à votre critère... vous pouvez
        chercher « tarte aux pommes », « poisson », etc.</p>
      `
      galleryContainer.innerHTML = errorMessage
    } else {
      recipesArray.forEach(recipe => {
        const recipesCards = new RecipeCard(recipe)
        galleryContainer.innerHTML += recipesCards.render()
      })
    }
  }

  clear () {
    const galleryContainer = document.querySelector('#recipes-container')
    galleryContainer.innerHTML = ''
  }
}

export default Gallery
