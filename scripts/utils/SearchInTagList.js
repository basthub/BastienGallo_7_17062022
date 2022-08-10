import { displayTagList } from '../pages/Index.js'

function searchInTagList (input, array, container) {
  if (input.value.length >= 1) {
    const filterTagsArray = array.filter(elm => elm.toLowerCase().includes(input.value.toLowerCase()))
    container.innerHTML = ''
    displayTagList(filterTagsArray, container)
  } else {
    displayTagList(array, container)
  }
}

export default searchInTagList
