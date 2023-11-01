import React from 'react'
import { Link } from 'react-router-dom'

const FavoriteRecipeTile = ({recipe, userId, getUserPageInfo}) => {
  const deleteFavorite = () => {
    fetch(`/api/v1/users/${userId}/favorite_recipes/${recipe.id}`, {
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
        getUserPageInfo()
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div className="grid-x grid-margin-x">
      <div className='button delete-button cell small-1 text-center' onClick={deleteFavorite}>
        X
      </div>
      <div className='cell small-8' key={recipe.id}>
        <h3><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link></h3>
      </div>
    </div>
  )
}

export default FavoriteRecipeTile
