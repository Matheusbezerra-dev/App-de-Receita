import React, { useState, useMemo, useEffect } from 'react';
import AppContext from './AppContext';
import requestMealsAPI from '../services/requestMealsAPI';

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

  useEffect(() => {
    async function requestAPI() {
      const { filterOption, valueSearch } = filterSearch;
      const request = await requestMealsAPI(filterOption, valueSearch);
      return request;
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
