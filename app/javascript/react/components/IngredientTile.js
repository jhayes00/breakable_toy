import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const IngredientTile = props => {
  const id = props.id
  const name = props.name
  const measuredName = props.measuredName
  const missedIngredients = props.missedIngredients
  let selected = props.selected
  let handleClick = props.handleClick

  // const [altIngredients, setAltIngredients] = useState({
  //   ingredient: "",
  //   substitutes: [],
  //   message: ""
  // });





  let isMissing = ""
  // missedIngredients.forEach((missedIngredient) => {
  //   if (name == missedIngredient.name) {
  //     isMissing = "is-missing"
  //   }
  // })

  if (selected) {
    isMissing = "is-missing"
  } else {
    isMissing = ""
  }

  return (
    <li className={isMissing} onClick={handleClick}>
      {measuredName}
    </li>
  )
}

export default IngredientTile
