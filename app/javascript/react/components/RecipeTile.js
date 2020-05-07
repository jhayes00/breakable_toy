import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RecipeTile = props => {
  const id = props.id
  const title = props.title
  const image = props.image
  const numLikes = props.numLikes
  const numMissedIngredients = props.numMissedIngredients
  const [recipe, setRecipe] = useState({
    id: props.id,
    title: props.title,
    image: props.image,
    numLikes: props.numLikes,
    numMissedIngredients: props.numMissedIngredients
  });

  // <Link to={`/recipes/${id}`}>

  return (
    <Link to={{
      pathname: `/recipes/${id}`,
      state: { recipe }
    }}>
      <div className='cell small-12 medium-4 text-center recipe-tile'>
        <img
          src={image}
          alt="image"
        />
        <h5>{title}</h5>
        Likes: {numLikes} <br />
        Missing Ingredients: {numMissedIngredients}
      </div>
    </Link>
  )
}

export default RecipeTile
