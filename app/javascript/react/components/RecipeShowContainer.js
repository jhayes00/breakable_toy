import React, { useState, useEffect } from 'react'

const RecipeShowContainer = props => {
  const [recipe, setRecipe] = useState({
    id: null,
    title: "",
    image: "",
    missedIngredients: []
  })

  useEffect(() => {
    let recipeId = props.match.params.id
    fetch(`/api/v1/recipes.json`)
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
      setRecipe(recipeBody)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let missedIngredientList = recipe.missedIngredients.map((ingredient) => {
    <li>ingredient</li>
  })

  return(
    <div>
      <h3>{recipe.title}</h3>

      <img
        src={recipe.image}
        alt="image"
      />

      <h5>Missing Ingredients</h5>
      <ul>
        {missedIngredientList}
      </ul>
    </div>
  )
}

export default RecipeShowContainer
