import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import FavoriteRecipeTile from './FavoriteRecipeTile'

const UserShowContainer = props => {
  const [user, setUser] = useState({
    email: "",
    favorite_recipes: []
  })

  let getUserPageInfo = () => {
    let userId = props.match.params.id
    fetch('/api/v1/users/' + userId)
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedData => {
      setUser(parsedData)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }
  useEffect(() => {
    getUserPageInfo()
  }, [])

  let userFavorites
  if (user.email.length > 0) {
    userFavorites = user.favorite_recipes.map((favorite) => {
      return (
        <FavoriteRecipeTile
          key={favorite.recipe.id}
          recipeId={favorite.recipe.id}
          userId={favorite.user.id}
          title={favorite.recipe.title}
          getUserPageInfo={getUserPageInfo}
        />
      )
    })
  }

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x grid-padding-y">
        <div className="cell auto">
          <h2 className="user-profile">{user.email}</h2>
          <ul>
            {userFavorites}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserShowContainer
