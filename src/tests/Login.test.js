import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a page Login', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const btnTestId = 'login-submit-btn';
  const validEmail = 'teste@teste.com';
  test('Testa se existe os inputs no Login', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  test('Testa se, ao digitar um email e senha válidos, o botão Entrar é habilitado', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, 'teste123456');
    expect(loginBtn).toBeEnabled();
  });
  test('Testa se, ao digitar um email inválido e uma senha válida, o botão Entrar está desabilitado', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);

    userEvent.type(inputEmail, 'teste.com');
    userEvent.type(inputPassword, 'teste123456');
    expect(loginBtn).toBeDisabled();
  });
  test('Testa se, ao digitar um email válido e uma senha inválida, o botão Entrar está desabilitado', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, '123');
    expect(loginBtn).toBeDisabled();
  });
  test('Testa se, ao digitar um e-mail e uma senha válida, o usuário é direcionado para a rota "/meals" ', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, 'teste123456');

    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/meals');
  });
});
