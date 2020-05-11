import React from 'react'
import { Link } from 'react-router-dom'

const PantryItemTile = props => {
  const id = props.id
  const name = props.name
  const quantity = props.quantity
  const onChangeCheckbox = props.onChangeCheckbox
  const isChecked = props.isChecked

  let quantityString = ""
  if (quantity !== null) {
    quantityString = `(${quantity})`
  }

  return (
    <div>
      <input
        type="checkbox"
        key={id}
        id={id}
        value={name}
        onClick={onChangeCheckbox}
      /> {name} {quantityString}
    </div>
  )
}

export default PantryItemTile
