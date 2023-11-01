import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RecipeTile = recipe => (
  <div className='cell small-12 medium-4 text-center recipe-tile'>
    <Link to={`/recipes/${recipe.id}`}>
      <img
        src={recipe.image}
        alt="image"
      />
      <h5>{recipe.title}</h5>
    </Link>
    Likes: {recipe.numLikes} <br />
    Missing Ingredients: {recipe.numMissedIngredients}
  </div>
)

export default RecipeTile
