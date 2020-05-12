import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import PantryItemTile from './PantryItemTile'
import NewPantryItemForm from './NewPantryItemForm'

const PantryIndexContainer = props => {
  const [pantryItems, setPantryItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateItem, setUpdateItem] = useState({
    name: "",
    quantity: ""
  })

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
      setPantryItems(pantryBody)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  useEffect(() => {
    updatePantry()
  }, [])

  const onChangeCheckbox = event => {
    if (selectedItems.includes(event.currentTarget.id)) {
      setSelectedItems(selectedItems.filter(id => id !== event.currentTarget.id));
      setUpdateItem({
        name: ""
      });
    } else {
      setSelectedItems([...selectedItems, event.currentTarget.id])
      setUpdateItem({
        name: event.currentTarget.value
      });
    }


  }

  let pantryItemTiles = pantryItems.map((item) => {
    return(
      <PantryItemTile
        key={item.id}
        id={item.id}
        name={item.name}
        quantity={item.quantity}
        onChangeCheckbox={onChangeCheckbox}
      />
    )
  })

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
          updatePantry()
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    })
  }

  let selectedItem
  if (selectedItems.length == 1) {
    selectedItem = selectedItems[0]
  }

  let deleteButton = "button"
  if (selectedItems.length == 0) {
    deleteButton = "button inactive-button"
  }

  return(
    <div className="grid-container pantry-container">
      <div className="grid-x grid-margin-x grid-padding-x grid-padding-y">
        <div className="cell small-12 medium-6">
          <h3><Link to='/recipes'>
            Search Recipes
          </Link></h3>

          <NewPantryItemForm
            updatePantry={updatePantry}
            selectedItem={selectedItem}
            updateItem={updateItem}
          />
        </div>

        <div className="cell small-12 medium-6 pantry">
          <h3>Current Pantry</h3>
          <ul>
            {pantryItemTiles}
          </ul>
          <div className={deleteButton} onClick={handleDelete}>Delete Selected</div>
        </div>
      </div>
    </div>
  )
}

export default PantryIndexContainer
