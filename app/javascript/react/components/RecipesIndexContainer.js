import React, {useState, useEffect} from 'react'

import RecipeTile from './RecipeTile'

const RecipesIndexContainer = props => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/v1/recipes.json')
    .then(response => {
      debugger
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
        image={recipe.image}
        numLikes={recipe.likes}
        numMissedIngredients={recipe.missedIngredientCount}
      />
    )
  })

  return(
    <div className='grid-container'>
      <div className='grid-x grid-margin-x grid-padding-y light-gray-background'>
        {recipeTiles}
      </div>
    </div>
  )
}

export default RecipesIndexContainer
