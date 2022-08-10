import { searchBar } from '../pages/Index.js'

function filteredBySearchBar (recipes) {
  const filteredArray = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchBar.value.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchBar.value.toLowerCase()) ||
      recipe.ingredients.includes((ingredient) => ingredient.ingredient.toLowerCase().includes(searchBar.value.toLowerCase()))
    )
  })

  return filteredArray
}
export default filteredBySearchBar
