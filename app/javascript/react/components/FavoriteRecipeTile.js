import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const FavoriteRecipeTile = props => {
  const recipeId = props.recipeId
  const userId = props.userId
  const title = props.title

  const deleteFavorite = (event) => {
    fetch(`/api/v1/users/${userId}/favorite_recipes/${recipeId}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(parsedData => {
      if (parsedData.errors){
      setErrors(parsedData.errors)
      } else {
        props.getUserPageInfo()
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div className="grid-x grid-margin-x">
      <div className='button delete-button cell small-1 text-center' onClick={deleteFavorite}>
        X
      </div>
      <div className='cell small-8'>
        <li key={recipeId}>
          <h3><Link to={`/recipes/${recipeId}`}>{title}</Link></h3>
        </li>
      </div>
    </div>
  )
}

export default FavoriteRecipeTile
