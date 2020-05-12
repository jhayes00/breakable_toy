import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RecipeTile = props => {
  const id = props.id
  const title = props.title
  const image = props.image
  const numLikes = props.numLikes
  const numMissedIngredients = props.numMissedIngredients

  return (
    <div className='cell small-12 medium-4 text-center recipe-tile'>
      <Link to={`/recipes/${id}`}>
        <img
          src={image}
          alt="image"
        />
        <h5>{title}</h5>
      </Link>
      Likes: {numLikes} <br />
      Missing Ingredients: {numMissedIngredients}
    </div>
  )
}

export default RecipeTile
