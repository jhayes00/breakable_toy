import React from 'react'
import { Link } from 'react-router-dom'

const InstructionTile = props => {
  // const id = props.id
  const number = props.number
  const step = props.step

  // Consider dividing instruction string into a bulleted list.

  return (
    <p>
      Step {number} - {step}
    </p>
  )
}

export default InstructionTile
