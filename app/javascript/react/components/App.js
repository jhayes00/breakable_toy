import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import RecipesIndexContainer from './RecipesIndexContainer'
import RecipeShowContainer from './RecipeShowContainer'
import PantryIndexContainer from './PantryIndexContainer'
import UserShowContainer from './UserShowContainer'

// Add tests (unit, cypress, controller)
export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/recipes' component={RecipesIndexContainer}/>
        <Route exact path='/recipes/:id' component={RecipeShowContainer}/>
        <Route exact path='/pantry' component={PantryIndexContainer}/>
        <Route exact path='/users/:id' component={UserShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
