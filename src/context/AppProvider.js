import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from './AppContext';
import requestMealsAPI from '../services/requestMealsAPI';
import requestDrinkssAPI from '../services/requestDrinksAPI';

export default function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filterRadio, setFilterRadio] = useState('');
  const [filterSearch, setFilterSearch] = useState({
    filterOption: '',
    valueSearch: '',
  });
  const [filterInputName, setFilterInputName] = useState('');

  const [resultSearch, setResultSearch] = useState([]);

  const contextApp = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    filterRadio,
    setFilterRadio,
    filterSearch,
    setFilterSearch,
    filterInputName,
    setFilterInputName,
    resultSearch,
    setResultSearch,
  }), [
    email,
    setEmail,
    password,
    setPassword,
    filterRadio,
    setFilterRadio,
    filterSearch,
    setFilterSearch,
    filterInputName,
    setFilterInputName,
    resultSearch,
    setResultSearch,
  ]);

  const { pathname } = useLocation();

  useEffect(() => {
    async function requestAPI() {
      const { filterOption, valueSearch } = filterSearch;
      if (filterOption === 'first-letter-search' && valueSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      if (pathname === '/meals') {
        const request = await requestMealsAPI(filterOption, valueSearch);
        setResultSearch(request);
      }
      if (pathname === '/drinks') {
        const request = await requestDrinkssAPI(filterOption, valueSearch);
        setResultSearch(request);
      }
    }
    requestAPI();
  }, [filterSearch, pathname]);

  const history = useHistory();

  useEffect(() => {
    if (pathname === '/meals' && resultSearch?.length === 1) {
      history.push(`/meals/${resultSearch[0].idMeal}`);
    }
    if (pathname === '/drinks' && resultSearch?.length === 1) {
      history.push(`/drinks/${resultSearch[0].idDrink}`);
    }
  }, [resultSearch]);

  return (
    <div>
      <AppContext.Provider value={ contextApp }>
        {children}
      </AppContext.Provider>
    </div>
  );
}

AppProvider.propTypes = {}.isRequired;
