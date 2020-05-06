import React from 'react'
import { Link } from 'react-router-dom'

const PantryItemTile = props => {
  const name = props.name
  const quantity = props.quantity

  let quantityString = ""
  if (quantity !== null) {
    quantityString = `(${quantity})`
  }

  return (
    <li>
      {name} {quantityString}
    </li>
  )
}

export default PantryItemTile
