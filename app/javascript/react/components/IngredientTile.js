import React from 'react'

const IngredientTile = ({measuredName, isSelected, handleClick, altIngredients, isInPantry}) => (
  <div>
    <br />
    <li className={isInPantry ? "ingredient" : "ingredient is-missing"} onClick={handleClick}>
      {measuredName}
    </li>
    {isSelected ? 
      altIngredients.status == "success" ?
        altIngredients.substitutes.map((substitute) => (
          <div>{substitute}</div>
        ))
      : altIngredients.message
    : ''}
  </div>
)

export default IngredientTile
