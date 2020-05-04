import React from 'react'
import { Link } from 'react-router-dom'

const PantryItemTile = props => {
  const name = props.name

  return (
    <li>
      {name}
    </li>
  )
}

export default PantryItemTile
