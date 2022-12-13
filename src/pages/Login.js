import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import logoRecipes from '../images/logoRecipesApp.png';
import tomate from '../images/tomate.png';
import {
  ContainerLogin,
  ImgLogo,
  ImgTomate,
  ContainerImg,
  ContainerInputLogin,
  ContainerInpunt,
  H1Login,
  Inputs,
  Button,
} from './LoginStyle';

function Login() {
  const { email, password, setEmail, setPassword } = useContext(AppContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const MAXPASSLENGTH = 6;
    const verifyEmail = /\S+@\S+\.\S+/.test(email);
    const verifyPassword = password.length > MAXPASSLENGTH;
    const btnDisabled = verifyEmail && verifyPassword;
    setIsDisabled(!(btnDisabled));
  }, [email, password]);

  const handleBtn = () => {
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    history.push('/meals');
  };

  return (
    <ContainerLogin>
      <ContainerImg>
        <ImgLogo src={ logoRecipes } alt="logo Recipes" />
        <ImgTomate src={ tomate } alt="tomate" />
      </ContainerImg>
      <ContainerInputLogin>
        <H1Login>Login</H1Login>
        <ContainerInpunt>
          <Inputs
            placeholder="Email"
            type="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <Inputs
            placeholder="Senha"
            type="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <Button
            disabled={ isDisabled }
            data-testid="login-submit-btn"
            onClick={ handleBtn }
          >
            Entrar
          </Button>
        </ContainerInpunt>
      </ContainerInputLogin>
    </ContainerLogin>
  );
}

export default Login;

Login.propTypes = {}.isRequired;
