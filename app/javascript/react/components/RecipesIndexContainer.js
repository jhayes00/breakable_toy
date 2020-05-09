import React, {useState, useEffect} from 'react'

import RecipeTile from './RecipeTile'

const RecipesIndexContainer = props => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/v1/recipes.json')
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
      setRecipes(recipeBody)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let sorted_recipes = recipes.sort(function(a,b) {
    return a.missedIngredientCount - b.missedIngredientCount
  })

  let recipeTiles = sorted_recipes.map((recipe) => {
    return(
      <RecipeTile
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
        numLikes={recipe.likes}
        numMissedIngredients={recipe.missedIngredientCount}
        missedIngredients={recipe.missedIngredients}
      />
    )
  })

  return(
    <div className='grid-container'>
      <div className='grid-x grid-margin-x grid-padding-y'>
        {recipeTiles}
      </div>
    </div>
  )
}

export default RecipesIndexContainer
