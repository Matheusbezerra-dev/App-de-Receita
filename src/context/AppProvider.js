import React, { useState, useMemo } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contextApp = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [email, setEmail, password, setPassword]);

  return (
    <div>
      <AppContext.Provider value={ contextApp }>
        {children}
      </AppContext.Provider>
    </div>
  );
}

AppProvider.propTypes = {}.isRequired;
