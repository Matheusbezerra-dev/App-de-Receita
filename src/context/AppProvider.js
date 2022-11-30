import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  ]);

  const { pathname } = useLocation();

  useEffect(() => {
    async function requestAPI() {
      const { filterOption, valueSearch } = filterSearch;
      console.log(pathname);
      if (filterOption === 'first-letter-search' && valueSearch.length > 1) {
        window.alert('Your search must have only 1 (one) character');
      }
      if (pathname === '/meals') {
        const request = await requestMealsAPI(filterOption, valueSearch);
        return request;
      }
      if (pathname === '/drinks') {
        const request = await requestDrinkssAPI(filterOption, valueSearch);
        return request;
      }
    }
    requestAPI();
  }, [filterSearch]);

  return (
    <div>
      <AppContext.Provider value={ contextApp }>
        {children}
      </AppContext.Provider>
    </div>
  );
}

AppProvider.propTypes = {}.isRequired;
