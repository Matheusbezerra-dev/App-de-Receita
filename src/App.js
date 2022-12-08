import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
// import Recipes from './pages/Recipes';
import DoneRecipes from './components/DoneRecipes';
import Drinks from './components/Drinks';
import Meals from './components/Meals';
import RecipeDetails from './components/RecipeDetails';
import Profile from './components/Profile';
import FavoriteRecipes from './components/FavoriteRecipes';
import RecipeInProgress from './components/RecipeInProgress';
import GlobalStyled from './style/GlobalStyled';

export default function App() {
  return (
    <>
      <GlobalStyled />
      <AppProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route
            exact
            path="/meals/:id"
            component={ RecipeDetails }
          />
          <Route
            exact
            path="/drinks/:id"
            component={ RecipeDetails }
          />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </AppProvider>
    </>
  );
}
