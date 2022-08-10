import { ingredientsTags, appliancesTags, ustensilsTags } from '../pages/Index.js'

class Tags {
  constructor (recipe, filteredRecipe) {
    this.recipe = recipe
    this.filteredRecipe = filteredRecipe
  }

  render (recipesArray) {
    recipesArray.forEach(recipes => {
      const ingredients = recipes.ingredients

      ingredients.forEach(ingredient => {
        if (ingredientsTags.indexOf(ingredient.ingredient.toLowerCase()) === -1) {
          ingredientsTags.push(ingredient.ingredient.toLowerCase())
        }
      })

      recipes.ustensils.forEach(ustensil => {
        if (ustensilsTags.indexOf(ustensil.toLowerCase()) === -1) {
          ustensilsTags.push(ustensil.toLowerCase())
        }
      })

      const appliance = recipes.appliance
      if (appliancesTags.indexOf(appliance) === -1) {
        appliancesTags.push(appliance)
      }
    })
  }
}

export default Tags
