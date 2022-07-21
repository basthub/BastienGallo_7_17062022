import recipes from "../data/recipes.js";
import RecipeCard from "../factories/RecipeFactory.js";
import filteredBySearchBar from "../utils/SearchBarFilter.js";
import filteredByTags from "../utils/TagsFilter.js";

const searchBar = document.querySelector('#searchbar')
const activeTagsContainer = document.querySelector('.search__activetags')
const ingredientsTagsContainer = document.querySelector('.ingredients-container')
const appliancesTagsContainer = document.querySelector('.appliances-container')
const ustensilsTagsContainer = document.querySelector('.ustensils-container')

const ingredientsTagsFilter = document.querySelector('.ingredients-input')
const appliancesTagsFilter = document.querySelector('.appliances-input')
const ustensilsTagsFilter = document.querySelector('.ustensils-input')
const gallery = document.querySelector('#recipes-container')

let filteredRecipes = recipes
let ingredientsTags = []
let appliancesTags = []
let ustensilsTags = []
let activeTags = []

searchBar.addEventListener("input", function(){
  init()
})


function filterTagsList (input, array, container){
  if (input.value.length >= 1){
    const filterTagsArray = array.filter(elm => elm.toLowerCase().includes(input.value.toLowerCase()))
    container.innerHTML = ""
    applyTagsFilter(filterTagsArray,container)
  }
  else{
    applyTagsFilter(array, container)
  }
}
const applyTagsFilter = (array, container) => {
  container.innerHTML = ""
  array.forEach(elm => {
    const li = document.createElement('li')
    li.innerHTML = `${elm} `
    li.addEventListener('click', function() {
      if(activeTags.indexOf(elm) === -1){
        const tag = document.createElement('div')
        tag.className = 'tag'
        const tagTitle = document.createElement('span')
        tagTitle.className = 'tag_title'
        tagTitle.innerHTML = `${elm}`
        const tagCloseBtn = document.createElement('button')
        tagCloseBtn.type = 'button'
        tagCloseBtn.name = 'delete tag'
        tagCloseBtn.innerHTML =`<i class='fa-regular fa-circle-xmark'></i>`
        
        activeTags.push(elm)

        
        tagCloseBtn.addEventListener('click', function(){
          activeTags = activeTags.filter(function(e) {return e !== elm})
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
  if (array.length === 0) {
    const errorMessage = document.createElement('li')
    errorMessage.className = 'errorMessage'
    errorMessage.innerHTML = "Aucun Résultat"
    container.appendChild(errorMessage)
  }
}

ingredientsTagsFilter.addEventListener('input', function(){
  filterTagsList(ingredientsTagsFilter, ingredientsTags, ingredientsTagsContainer)
})

appliancesTagsFilter.addEventListener('input', function(){
  filterTagsList(appliancesTagsFilter, appliancesTags, appliancesTagsContainer)  
})

ustensilsTagsFilter.addEventListener('input', function(){
  filterTagsList(ustensilsTagsFilter, ustensilsTags, ustensilsTagsContainer)
})


function clearTags(){
  ingredientsTags = []
  appliancesTags = []
  ustensilsTags = []
  ingredientsTagsContainer.innerHTML = ''
  appliancesTagsContainer.innerHTML = ''
  ustensilsTagsContainer.innerHTML = ''

}

function clearGallery(){
      gallery.innerHTML = ''
}

function initGallery (displayArray){
  const gallery = document.querySelector('#recipes-container')
  console.log(displayArray)
  if(displayArray.length === 0){
    const errorMessage = 
    `
      <p class="noresultmessage">Aucune recette ne correspond à votre critère... vous pouvez
      chercher « tarte aux pommes », « poisson », etc.</p>
    `
    gallery.innerHTML = errorMessage;
  }
  else{
    displayArray.forEach(recipe => {
      const recipesCards = new RecipeCard(recipe)
      gallery.innerHTML += recipesCards.render()
    }); 
  }
}






function init(){
  if (searchBar.value.length < 3){
    clearGallery()
    clearTags()
    if (activeTags.length >0){
      initGallery(filteredByTags(recipes))
    }
    else{
      initGallery(recipes)
    }
    applyTagsFilter(ingredientsTags, ingredientsTagsContainer)
    applyTagsFilter(appliancesTags, appliancesTagsContainer)
    applyTagsFilter(ustensilsTags, ustensilsTagsContainer)
  }
  else {
    filteredRecipes = filteredBySearchBar(recipes)
    if(activeTags.length > 0){
      filteredRecipes = filteredByTags(filteredRecipes)
      
    }
    clearGallery()
    clearTags()
    initGallery(filteredRecipes)
    applyTagsFilter(ingredientsTags, ingredientsTagsContainer)
    applyTagsFilter(appliancesTags, appliancesTagsContainer)
    applyTagsFilter(ustensilsTags, ustensilsTagsContainer)
    
  }
}

export {init, searchBar, ingredientsTags, appliancesTags, ustensilsTags, activeTags}