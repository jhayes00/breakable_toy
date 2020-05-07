import React from 'react'
import { Link } from 'react-router-dom'

const IngredientTile = props => {
  const id = props.id
  const name = props.name
  const measuredName = props.measuredName

  return (
    <li>
      {measuredName}
    </li>
  )
}

export default IngredientTile
