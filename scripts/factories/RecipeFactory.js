class RecipeCard {
  constructor(recipe){
    this.recipe = recipe
  }

  render(){
    let recipeImg =`<img src="#" alt="Photo de la recette ${this.recipe.name}" class="recipe__preview" />`
    let ingredients = this.recipe.ingredients
    let ingredientsList = ''
    
    ingredients.forEach(ingredient => {
      let unit = ''
      let quantity = ''
      if (ingredient.unit){
        unit = ingredient.unit
      }
      if (ingredient.quantity){
        quantity = `: `+ingredient.quantity
      }
      ingredientsList += `<li><b>${ingredient.ingredient}</b>${quantity} ${unit}</li>`
      });

    return `
    <a href='#'> 
      <article class="recipe">
        <div class="recipe_thumbnail">
        ${recipeImg}
        </div>
        <div class="recipe_details">
          <div>
            <h2>${this.recipe.name}</h2>
            <span><i class="fa-regular fa-clock"></i> ${this.recipe.time} min</span>
          </div>
          <div>
            <ul>
              ${ingredientsList}
            </ul>
              <p>${this.recipe.description}</p>
          </div>    
      </article>
    </a>
    `
  }
}

export default RecipeCard