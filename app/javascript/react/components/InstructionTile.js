import React from 'react'
import { Link } from 'react-router-dom'

const InstructionTile = props => {
  const id = props.id
  const instructions = props.instrcutions

  // Consider dividing instruction string into a bulleted list.

  return (
    <li>
      {instrcutions}
    </li>
  )
}

export default InstructionTile
