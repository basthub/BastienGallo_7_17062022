import { searchBar } from '../pages/Index.js'

function filteredBySearchBar (recipes) {
  const filteredArray = []

  for (let rcp = recipes.length; rcp >= 0; rcp--) {
    let containsName = false
    let containsDescription = false
    let containsIngredients = false

    if (recipes[rcp]?.name.toLowerCase().includes(searchBar.value.toLowerCase())) {
      containsName = true
    }
    for (let igd = 0; igd < recipes[rcp]?.ingredients[igd]?.ingredient.length; igd++) {
      if (recipes[rcp].ingredients[igd]?.ingredient?.toLowerCase().includes(searchBar.value.toLowerCase())) {
        containsIngredients = true
      }
    }
    if (recipes[rcp]?.description.toLowerCase().includes(searchBar.value.toLowerCase())) {
      containsDescription = true
    }
    if (containsName || containsIngredients || containsDescription) {
      filteredArray.push(recipes[rcp])
    }
  }
  return filteredArray
}
export default filteredBySearchBar
