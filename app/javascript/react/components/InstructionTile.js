import React from 'react'
import { Link } from 'react-router-dom'

const InstructionTile = props => {
  const id = props.id
  const number = props.number
  const step = props.step

  return (
    <p>
      <b>Step {number}</b> - {step}
    </p>
  )
}

export default InstructionTile
