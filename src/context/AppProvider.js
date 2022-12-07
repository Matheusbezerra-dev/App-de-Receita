import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from './AppContext';
import requestMealsAPI from '../services/requestMealsAPI';
import requestDrinksAPI from '../services/requestDrinksAPI';

export default function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState({});
  const [password, setPassword] = useState('');
  const [filterSearch, setFilterSearch] = useState({});
  const [filterInputName, setFilterInputName] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [renderedSearchResults, setRenderedSearchResults] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();

  const requestAPI = useCallback(async () => {
    const { filterOption, valueSearch } = filterSearch;
    if (filterOption === 'first-letter-search' && valueSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (pathname === '/meals') {
      const response = await requestMealsAPI(filterOption, valueSearch);
      if (response === undefined) {
        setResultSearch([]);
      }
      setResultSearch(response);
    } else if (pathname === '/drinks') {
      const response = await requestDrinksAPI(filterOption, valueSearch);
      if (response === undefined) {
        setResultSearch([]);
      }
      setResultSearch(response);
    }
  }, [filterSearch, pathname]);

  useEffect(() => {
    function resultsConditions() {
      if (resultSearch === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        if (pathname === '/meals' && resultSearch.length === 1) {
          history.push(`/meals/${resultSearch[0].idMeal}`);
        }
        if (pathname === '/drinks' && resultSearch.length === 1) {
          history.push(`/drinks/${resultSearch[0].idDrink}`);
        }
        if (resultSearch.length > 1) {
          setRenderedSearchResults(true);
        }
      }
    }
    resultsConditions();
  }, [resultSearch, history, pathname]);

  const id = history.location.pathname.split('/')[2];
  const titlePage = history.location.pathname.includes('meals') ? 'meals' : 'drinks';

  const favorite = useCallback(() => {
    let favoriteRevenue = {};
    if (titlePage === 'meals') {
      favoriteRevenue = {
        id: details.idMeal,
        type: 'meal',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
      };
    } else {
      favoriteRevenue = {
        id: details.idDrink,
        type: 'drink',
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb,
      };
    }
    let arrayFavorite = [];
    if (showFavorite === false) {
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([favoriteRevenue]),
        );
        setShowFavorite(true);
      } else {
        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
        arrayFavorite = [...favorites, favoriteRevenue];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorite));
        setShowFavorite(true);
      }
    } else {
      arrayFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filteredRevenues = arrayFavorite.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRevenues));
      setShowFavorite(false);
    }
  }, [
    details.idDrink,
    details.idMeal,
    details.strAlcoholic,
    details.strArea,
    details.strCategory,
    details.strDrink,
    details.strDrinkThumb,
    details.strMeal,
    details.strMealThumb,
    id,
    showFavorite,
    titlePage,
  ]);

  const checkFavorite = useCallback(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveFavorite = allFavorites.some((e) => e.id === id);
      setShowFavorite(haveFavorite);
    }
  }, [id]);

  useEffect(() => checkFavorite(), [checkFavorite]);

  const contextApp = useMemo(() => ({
    details,
    setDetails,
    email,
    setEmail,
    password,
    setPassword,
    filterSearch,
    setFilterSearch,
    filterInputName,
    setFilterInputName,
    resultSearch,
    setResultSearch,
    requestAPI,
    renderedSearchResults,
    favorite,
    showFavorite,
  }), [
    email,
    setEmail,
    password,
    setPassword,
    filterSearch,
    setFilterSearch,
    filterInputName,
    setFilterInputName,
    resultSearch,
    setResultSearch,
    requestAPI,
    renderedSearchResults,
    favorite,
    showFavorite,
    details,
    setDetails,
  ]);

  return (
    <div>
      <AppContext.Provider value={ contextApp }>
        {children}
      </AppContext.Provider>
    </div>
  );
}

AppProvider.propTypes = {}.isRequired;
