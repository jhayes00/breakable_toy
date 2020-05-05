import React, {useState, useEffect} from 'react'

import RecipeTile from './RecipeTile'

const RecipesIndexContainer = props => {
  const [recipes, setRecipes] = useState([]);
  

  let pantryItemsQuery = ""
  for (const item in props.location.state.pantryItems) {
    if (item > 0) { pantryItemsQuery += ',+' }
    pantryItemsQuery += props.location.state.pantryItems[item].name
  }
  pantryItemsQuery = pantryItemsQuery.split(' ').join('+')

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${pantryItemsQuery}&number=10&apiKey=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(recipeBody => {
      const recipesArr = recipeBody
      setRecipes(recipesArr)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let recipeTiles = recipes.map((recipe) => {
    return(
      <RecipeTile
        key={recipe.id}
        title={recipe.title}
      />
    )
  })

  return(
    <ul>
      {recipeTiles}
    </ul>
  )
}

export default RecipesIndexContainer
