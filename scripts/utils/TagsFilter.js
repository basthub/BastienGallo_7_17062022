import { activeTags } from '../pages/Index.js'

function filteredByTags (array) {
  const filteredArray = []

  array.forEach(elm => {
    activeTags.forEach(tag => {
      if (
        elm.name.toLowerCase().includes(tag.toLowerCase()) ||
      elm.description.toLowerCase().includes(tag.toLowerCase()) ||
      elm.ingredients.includes((ingredient) => ingredient.ingredients.toLowerCase().includes(tag.toLowerCase())) ||
      elm.ustensils.includes(tag.toLowerCase()) ||
      elm.appliance.includes(tag.toLowerCase())
      ) {
        filteredArray.push(elm)
      }
    })
  })

  return filteredArray
}
export default filteredByTags
