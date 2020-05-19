import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import IngredientTile from './IngredientTile'
import InstructionTile from './InstructionTile'

const RecipeShowContainer = props => {
  const [pantryItems, setPantryItems] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState()

  const [recipe, setRecipe] = useState({
    id: null,
    title: "",
    image: "",
    extendedIngredients: [],
    analyzedInstructions: []
  })

  const [altIngredients, setAltIngredients] = useState({
    status: "",
    ingredient: "",
    substitutes: [],
    message: ""
  });

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
      setRecipe({
        id: recipeBody.id,
        title: recipeBody.title,
        image: recipeBody.image,
        sourceUrl: recipeBody.source_url,
        sourceName: recipeBody.source_name,
        servings: recipeBody.servings,
        readyInMinutes: recipeBody.ready_in_minutes,
        spoonacularScore: recipeBody.spoonacular_score,
        aggregateLikes: recipeBody.num_likes,
        extendedIngredients: recipeBody.extended_ingredients,
        analyzedInstructions: recipeBody.analyzed_instructions
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  useEffect(() => {
    fetch("/api/v1/items.json")
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
    .then(pantryBody => {
      const pantryArr = pantryBody.map((item) => {
        return(
          item.name
        )
      })
      setPantryItems(pantryArr)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const toggleIngredientSelect = (ingredient) => {
    if(ingredient.name == selectedIngredient) {
      setSelectedIngredient(null)
    }
    else {
      setSelectedIngredient(ingredient.name)
      fetch(`/api/v1/ingredients/${ingredient.name}.json`)
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
      .then(substitutesBody => {
        setAltIngredients(substitutesBody)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  let selected
  let handleClick
  let isInPantry
  let ingredientList = recipe.extendedIngredients.map((ingredient) => {
    if (pantryItems.includes(ingredient.name)) {
      isInPantry = true
    } else {
      isInPantry = false
    }

    selected = false
    if (selectedIngredient == ingredient.name) {
      selected = true
    }

    handleClick = () => {
      setAltIngredients({
        status: "",
        ingredient: "",
        substitutes: [],
        message: ""
      });

      toggleIngredientSelect(ingredient)
    }

    return(
      <IngredientTile
        key={ingredient.id}
        name={ingredient.name}
        measuredName={ingredient.original}
        selected={selected}
        handleClick={handleClick}
        altIngredients={altIngredients}
        isInPantry={isInPantry}
      />
    )
  })

  let instructionList
  if (recipe.analyzedInstructions.length > 0) {
    debugger
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

  return(
    <div className="grid-container">
      <div className="grid-x grid-margin-x grid-padding-x grid-padding-y">
        <div className="cell small-12 medium-6">
          <img
            src={recipe.image}
            alt="image"
          />
        </div>

        <div className="cell small-12 medium-6 recipe-info">
        <h3>{recipe.title}</h3>
          <h5><a href={recipe.sourceUrl} target="_blank">Original Recipe from {recipe.sourceName}</a></h5>
          <h5>Servings: {recipe.servings}</h5>
          <h5>Cooktime: {recipe.readyInMinutes} Minutes</h5>
          <h5>Spoonacular Score: {recipe.spoonacularScore}</h5>
          <h5>Likes: {recipe.aggregateLikes}</h5>
        </div>

        <div className="cell small-12 medium-6 ingredients">
          <h4>Ingredients</h4>
          <h5 className="directions">Missing ingredients are blue, click for substitutes.</h5>
          <ul>
            {ingredientList}
          </ul>
        </div>

        <div className="cell small-12 medium-6 instructions">
          <h4>Instructions</h4>
          {instructionList}
        </div>
      </div>
    </div>
  )
}

export default RecipeShowContainer
