import recipes from '../data/recipes.js'
import Gallery from '../factories/Gallery.js'
import Tags from '../factories/Tags.js'
import filteredBySearchBar from '../utils/SearchBarFilter.js'
import filteredByTags from '../utils/TagsFilter.js'
import searchInTagList from '../utils/SearchInTagList.js'

const searchBar = document.querySelector('#searchbar')
const activeTagsContainer = document.querySelector('.search__activetags')
const ingredientsTagsContainer = document.querySelector('.ingredients-container')
const appliancesTagsContainer = document.querySelector('.appliances-container')
const ustensilsTagsContainer = document.querySelector('.ustensils-container')

const ingredientsTagsInput = document.querySelector('.ingredients-input')
const appliancesTagsInput = document.querySelector('.appliances-input')
const ustensilsTagsInput = document.querySelector('.ustensils-input')
const galleryContainer = document.querySelector('#recipes-container')

let filteredRecipes = recipes
let ingredientsTags = []
let appliancesTags = []
let ustensilsTags = []
let activeTags = []

const gallery = new Gallery(galleryContainer)
const initGallery = gallery.render
const tagList = new Tags(filteredRecipes)
const initTagList = tagList.render

searchBar.addEventListener('input', function () {
  init()
})
ingredientsTagsInput.addEventListener('input', function () {
  searchInTagList(ingredientsTagsInput, ingredientsTags, ingredientsTagsContainer)
})

appliancesTagsInput.addEventListener('input', function () {
  searchInTagList(appliancesTagsInput, appliancesTags, appliancesTagsContainer)
})

ustensilsTagsInput.addEventListener('input', function () {
  searchInTagList(ustensilsTagsInput, ustensilsTags, ustensilsTagsContainer)
})

const displayTagList = (tags, container) => {
  container.innerHTML = ''
  tags.forEach(elm => {
    const li = document.createElement('li')
    li.innerHTML = `${elm} `
    li.addEventListener('click', function () {
      if (activeTags.indexOf(elm) === -1) {
        const tag = document.createElement('div')
        tag.className = 'tag'
        if (container.className === 'ingredients-container') {
          tag.classList.add('search__filters--ingredients')
        }
        if (container.className === 'appliances-container') {
          tag.classList.add('search__filters--appliances')
        }
        if (container.className === 'ustensils-container') {
          tag.classList.add('search__filters--ustensils')
        }
        const tagTitle = document.createElement('span')
        tagTitle.className = 'tag_title'
        tagTitle.innerHTML = `${elm}`
        const tagCloseBtn = document.createElement('button')
        tagCloseBtn.type = 'button'
        tagCloseBtn.name = 'delete tag'
        tagCloseBtn.innerHTML = '<i class=\'fa-regular fa-circle-xmark\'></i>'
        activeTags.push(elm)

        tagCloseBtn.addEventListener('click', function () {
          activeTags = activeTags.filter(function (e) { return e !== elm })
          activeTagsContainer.removeChild(tag)
          init()
        })
        tag.appendChild(tagTitle)
        tag.appendChild(tagCloseBtn)
        activeTagsContainer.appendChild(tag)
        init()
      }
    })
    container.appendChild(li)
  })
  if (tags.length === 0) {
    const errorMessage = document.createElement('li')
    errorMessage.className = 'errorMessage'
    errorMessage.innerHTML = 'Aucun Résultat'
    container.appendChild(errorMessage)
  }
}

function clearTags () {
  ingredientsTags = []
  appliancesTags = []
  ustensilsTags = []
  ingredientsTagsContainer.innerHTML = ''
  appliancesTagsContainer.innerHTML = ''
  ustensilsTagsContainer.innerHTML = ''
}

function init () {
  gallery.clear()
  clearTags()

  if (searchBar.value.length < 3) {
    if (activeTags.length > 0) {
      initGallery(filteredByTags(recipes))
      initTagList(filteredByTags(recipes))
    } else {
      initGallery(recipes)
      initTagList(recipes)
    }
  } else {
    filteredRecipes = filteredBySearchBar(recipes)
    if (activeTags.length > 0) {
      filteredRecipes = filteredByTags(filteredRecipes)
    }
    initGallery(filteredRecipes)
    initTagList(filteredRecipes)
  }
  displayTagList(ingredientsTags, ingredientsTagsContainer)
  displayTagList(appliancesTags, appliancesTagsContainer)
  displayTagList(ustensilsTags, ustensilsTagsContainer)
}

export { init, searchBar, ingredientsTags, appliancesTags, ustensilsTags, activeTags, displayTagList }
