import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import PantryItemTile from './PantryItemTile'
import NewPantryItemForm from './NewPantryItemForm'

const PantryIndexContainer = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  let getPantry = () => {
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
      setPantryItems(pantryBody)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  useEffect(() => {
    getPantry()
  }, [])

  const onChangeCheckbox = event => {
    if (selectedItems.includes(event.currentTarget.id)) {
      setSelectedItems(selectedItems.filter(id => id !== event.currentTarget.id));
    } else {
      setSelectedItems([...selectedItems, event.currentTarget.id])
    }
  }

  const handleDelete = event => {
    event.preventDefault()
    selectedItems.forEach((item) => {
      fetch(`/api/v1/items/${item}`, {
        credentials: "same-origin",
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if(response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
          throw error
        }
      })
      .then(response => response.json())
      .then(parsedData => {
        if (parsedData.errors){
        setErrors(parsedData.errors)
        } else {
          getPantry()
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    })
  }

  return(
    <div className="grid-container pantry-container">
      <div className="grid-x grid-margin-x grid-padding-x grid-padding-y">
        <div className="cell small-12 medium-6">
          <h3>
            <Link to='/recipes'>
              Search Recipes
            </Link>
          </h3>

          <NewPantryItemForm
            getPantry={getPantry}
            selectedItem={selectedItems.length == 1 ? selectedItems[0] : undefined}
          />
        </div>

        <div className="cell small-12 medium-5 pantry">
          <h3>Current Pantry</h3>
          <ul>
            {pantryItems.map((item) => 
              <PantryItemTile
                item={item}
                onChangeCheckbox={onChangeCheckbox}
              />
          )}
          </ul>
          <button className={selectedItems.length == 0 ? "button inactive-button" : "button"} onClick={handleDelete}>
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  )
}

export default PantryIndexContainer
