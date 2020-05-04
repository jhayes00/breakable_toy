import React, {useState, useEffect} from 'react'

import RecipeTile from './RecipeTile'

const RecipesIndexContainer = props => {
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=${apiKey}`)
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
