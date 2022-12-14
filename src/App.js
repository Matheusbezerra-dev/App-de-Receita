import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import AppProvider from './context/AppProvider';
import styled from 'styled-components';
import Login from './pages/Login';
// import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './components/Drinks';
import Meals from './components/Meals';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';

const ContainerMain = styled.main`
  display: flex;
  justify-content: center;
`;

export default function App() {
  return (
    <ContainerMain>
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
    </ContainerMain>
  );
}
