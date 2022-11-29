import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';

function Login() {
  const { email, password, setEmail, setPassword } = useContext(AppContext);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const MAXPASSLENGTH = 6;
    const verifyEmail = /\S+@\S+\.\S+/.test(email);
    const verifyPassword = password.length > MAXPASSLENGTH;
    const btnDisabled = verifyEmail && verifyPassword;
    setIsDisabled(!(btnDisabled));
  }, [email, password]);

  return (
    <div>
      <input
        placeholder="Email"
        type="email"
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        placeholder="Senha"
        type="password"
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <Button disabled={ isDisabled } data-testid="login-submit-btn">
        Entrar
      </Button>
    </div>
  );
}

export default Login;
