import React from 'react'
import { Link } from 'react-router-dom'

const RecipeTile = props => {
  const title = props.title

  return (
    <li>
      {title}
    </li>
  )
}

export default RecipeTile
