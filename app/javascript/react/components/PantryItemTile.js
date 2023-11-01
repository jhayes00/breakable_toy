import React from 'react'

const PantryItemTile = ({item, onChangeCheckbox}) => (
  <div>
    <input
      className="checkbox"
      type="checkbox"
      key={item.id}
      id={item.id}
      value={item.name}
      onClick={onChangeCheckbox}
    /> {item.name} {item.quantity ? `(${item.quantity})` : ''}
  </div>
)

export default PantryItemTile
