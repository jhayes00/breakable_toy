import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import IngredientTile from './IngredientTile'
import InstructionTile from './InstructionTile'

const RecipeShowContainer = props => {
  // let missingIngredients = props.location.state.missedIngredients
  const [recipe, setRecipe] = useState({
    id: null,
    title: "",
    image: "",
    extendedIngredients: [],
    analyzedInstructions: []
  })
  const [selectedIngredient, setSelectedIngredient] = useState()

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

  // props.location.state.missingIngredients.each(() => {
  //
  // })


  // missedIngredients={missingIngredients}

  const toggleIngredientSelect = (ingredient) => {
    if(ingredient.name == selectedIngredient) {
      setSelectedIngredient(null)
    }
    else {
      setSelectedIngredient(ingredient.name)
    }
  }

  let selected
  let handleClick
  let ingredientList = recipe.extendedIngredients.map((ingredient) => {
    selected = false
    if (selectedIngredient == ingredient.name) {
      selected = true
    }

    handleClick = () => {
      toggleIngredientSelect(ingredient)
    }

    return(
      <IngredientTile
        key={ingredient.id}
        name={ingredient.name}
        measuredName={ingredient.original}
        selected={selected}
        handleClick={handleClick}
      />
    )
  })

  let instructionList
  if (recipe.analyzedInstructions.length > 0) {
    instructionList = recipe.analyzedInstructions[0].steps.map((instructionStep) => {
      return(
        <InstructionTile
          key={instructionStep.id}
          number={instructionStep.number}
          step={instructionStep.step}
        />
      )
    })
  }

  // <p>{recipe.summary}</p>
  // <p>{recipe.instructions}</p>

  return(
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-12 medium-6">
          <h3>{recipe.title}</h3>

          <img
            src={recipe.image}
            alt="image"
          />
        </div>

        <div className="cell small-12 medium-6">
          <p><a href={recipe.sourceUrl} target="_blank">Original Recipe from {recipe.sourceName}</a></p>

          <p>Cooktime: {recipe.readyInMinutes} Minutes</p>
          <p>Servings: {recipe.servings}</p>
          <p>Spoonacular Score: {recipe.spoonacularScore}</p>
          <p>Likes: {recipe.aggregateLikes}</p>
        </div>

        <div className="cell small-12 medium-12">
          <h5>Ingredients</h5>
          <ul>
            {ingredientList}
          </ul>
        </div>

        <div className="cell small-12 medium-12">
          <h5>Instructions</h5>
          {instructionList}
        </div>
      </div>
    </div>
  )
}

export default RecipeShowContainer
