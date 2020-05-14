import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import RecipesIndexContainer from './RecipesIndexContainer'
import RecipeShowContainer from './RecipeShowContainer'
import PantryIndexContainer from './PantryIndexContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/recipes' component={RecipesIndexContainer}/>
        <Route exact path='/recipes/:id' component={RecipeShowContainer}/>
        <Route exact path='/pantry' component={PantryIndexContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
