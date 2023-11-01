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

  let sortedRecipes = recipes.sort(function(a,b) {
    return a.missedIngredientCount - b.missedIngredientCount
  })

  return(
    <div className='grid-container'>
      <div className='grid-x grid-margin-x grid-padding-y grid-padding-x'>
        {sortedRecipes.map((recipe) => 
          <RecipeTile
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            numLikes={recipe.likes}
            numMissedIngredients={recipe.missedIngredientCount}
            missedIngredients={recipe.missedIngredients}
          />
        
      )}
      </div>
    </div>
  )
}

export default RecipesIndexContainer
