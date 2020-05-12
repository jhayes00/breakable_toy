import React from 'react'

const IngredientTile = props => {
  const id = props.id
  const name = props.name
  const measuredName = props.measuredName
  const missedIngredients = props.missedIngredients
  const selected = props.selected
  const handleClick = props.handleClick
  const altIngredients = props.altIngredients
  const isInPantry = props.isInPantry
  let substitutes
  let isMissing = ""

  if (isInPantry) {
    isMissing = ""
  } else {
    isMissing = "is-missing"
  }

  if (selected) {
    if (altIngredients.status == "success") {
      substitutes = altIngredients.substitutes.map((substitute) => {
        return(
          <div>{substitute}</div>
        )
      })
    } else {
      substitutes = altIngredients.message
    }
  } else {
    substitutes = ""
  }

  return (
    <div><br />
      <li className={isMissing} onClick={handleClick}>
        {measuredName}
      </li>
      {substitutes}
    </div>
  )
}

export default IngredientTile
