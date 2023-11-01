import React, { useState } from 'react'

import ErrorList from './ErrorList'

const NewPantryItemForm = ({getPantry, selectedItem}) => {
  const [errors, setErrors] = useState({})
  const [formVals, setFormVals] = useState({
    name: "",
    quantity: ""
  })

  const handleChange = event => {
    setFormVals({
      ...formVals,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validateForm = () => {
    let newErrors = {}
    const requiredFields = ["name"]
    requiredFields.forEach((field) => {
      if(formVals[field].trim() === "") {
        newErrors = {
          ...newErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = event => {
    event.preventDefault();
    if(validateForm()){
      fetch('/api/v1/items', {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(formVals),
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
      }
        getPantry()
        setFormVals({
          name: "",
          quantity: ""
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  const handleEdit = event => {
    event.preventDefault()
    if (selectedItem) {
      fetch(`/api/v1/items/${selectedItem}`, {
        credentials: "same-origin",
        method: "PATCH",
        body: JSON.stringify(formVals),
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
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <ErrorList
        errors={errors}
      />

      <h3>Add New Pantry Item</h3>
      <label htmlFor="name">Pantry Item Name:</label>
      <input
        className="text-input"
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={formVals.name}
      />

      <label htmlFor="quantity">Quantity (optional):</label>
      <input
        className="text-input"
        type="text"
        name="quantity"
        id="quantity"
        onChange={handleChange}
        value={formVals.quantity}
      />

      <input className={"button"} type="submit" />
      <button className={selectedItem ? "button" : "button inactive-button"} onClick={handleEdit}>
        Update Selected
      </button>
    </form>
  )
}

export default NewPantryItemForm
