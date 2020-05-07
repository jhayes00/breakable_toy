import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import PantryItemTile from './PantryItemTile'
import NewPantryItemForm from './NewPantryItemForm'

const PantryIndexContainer = props => {
  const [pantryItems, setPantryItems] = useState([]);

  let updatePantry = () => {
    fetch("/api/v1/items.json")
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(pantryBody => {
      const pantryArr = pantryBody
      setPantryItems(pantryArr)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  useEffect(() => {
    updatePantry()
  }, [])

  let pantryItemTiles = pantryItems.map((item) => {
    return(
      <PantryItemTile
        key={item.id}
        name={item.name}
        quantity={item.quantity}
      />
    )
  })

  return(
    <div className="grid-container pantry-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-12 medium-4">
          <h3><Link to='/recipes'>
            Search Recipes
          </Link></h3>

          <NewPantryItemForm
            updatePantry={updatePantry}
          />
        </div>

        <div className="cell small-12 medium-4 pantry">
          <h3>Current Pantry</h3>
          <ul>
            {pantryItemTiles}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PantryIndexContainer
