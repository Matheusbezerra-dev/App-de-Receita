import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
