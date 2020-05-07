import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import IngredientTile from './IngredientTile'

const RecipeShowContainer = props => {
  const [recipe, setRecipe] = useState({
    id: null,
    title: "",
    image: "",
    extendedIngredients: []
  })

  useEffect(() => {
    let recipeId = props.match.params.id
    fetch(`/api/v1/recipes/${recipeId}.json`)
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

  let ingredientList = recipe.extendedIngredients.map((ingredient) => {
    return(
      <IngredientTile
        key={ingredient.id}
        name={ingredient.name}
        measuredName={ingredient.original}
      />
    )
  })
debugger
  return(
    <div>
      <h3>{recipe.title}</h3>

      <img
        src={recipe.image}
        alt="image"
      />

      <a href={recipe.sourceUrl} target="_blank">Original Recipe from {recipe.sourceName}</a>

      <p>{recipe.summary}</p>

      <h5>Ingredients</h5>
      <ul>
        {ingredientList}
      </ul>

      <p>{recipe.instructions}</p>

    </div>
  )
}

export default RecipeShowContainer
