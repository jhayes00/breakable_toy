import React from 'react'
import { Link } from 'react-router-dom'

const IngredientTile = props => {
  const id = props.id
  const name = props.name
  const measuredName = props.measuredName
  const missedIngredients = props.missedIngredients
  let selected = props.selected
  let handleClick = props.handleClick
  let altIngredients = props.altIngredients
  let substitutes
  let isMissing = ""

  isMissing = "is-missing"
  isMissing = ""

  if (selected) {
    if (altIngredients.status == "success") {
      substitutes = altIngredients.substitutes.map((substitute) => {
        return(
          <p>{substitute}</p>
        )
      })
    } else {
      substitutes = altIngredients.message
    }
  } else {
    substitutes = ""
  }

  return (
    <div>
      <li className={isMissing} onClick={handleClick}>
        {measuredName}
      </li>
      {substitutes}
    </div>
  )
}

export default IngredientTile
