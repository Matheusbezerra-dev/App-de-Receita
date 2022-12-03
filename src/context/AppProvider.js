import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from './AppContext';
import requestMealsAPI from '../services/requestMealsAPI';
import requestDrinksAPI from '../services/requestDrinksAPI';

export default function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [filterSearch, setFilterSearch] = useState({});
  const [filterInputName, setFilterInputName] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [renderedSearchResults, setRenderedSearchResults] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();

  async function requestAPI() {
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
  }

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

  const contextApp = useMemo(() => ({
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
