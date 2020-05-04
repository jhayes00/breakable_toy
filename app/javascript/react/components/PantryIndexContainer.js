import React, {useState, useEffect} from 'react'

import PantryItemTile from './PantryItemTile'

const PantryIndexContainer = props => {
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    fetch("/api/v1/pantry_items.json")
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
  }, [])

  let pantryItemTiles = pantryItems.map((item) => {
    return(
      <PantryItemTile
        key={item.id}
        name={item.name}
      />
    )
  })

  return(
    <ul>
      {pantryItemTiles}
    </ul>
  )
}

export default PantryIndexContainer
