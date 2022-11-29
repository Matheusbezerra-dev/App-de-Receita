import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import Login from '../pages/Login';

describe('Testa a page Login', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const btnTestId = 'login-submit-btn';
  const validEmail = 'teste@teste.com';
  test('Testa se existe os inputs no Login', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  test('Testa se, ao digitar um email e senha válidos, o botão Entrar é habilitado', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, 'teste123456');
    userEvent.click(loginBtn);
    expect(loginBtn).toBeEnabled();
  });
  test('Testa se, ao digitar um email inválido e uma senha válida, o botão Entrar está desabilitado', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);
    userEvent.type(inputEmail, 'teste.com');
    userEvent.type(inputPassword, 'teste123456');
    userEvent.click(loginBtn);
    expect(loginBtn).toBeDisabled();
  });
  test('Testa se, ao digitar um email válido e uma senha inválida, o botão Entrar está desabilitado', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByTestId(btnTestId);
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, '123');
    userEvent.click(loginBtn);
    expect(loginBtn).toBeDisabled();
  });
  test('Testa se, ao digitar um e-mail e uma senha válida, o usuário é direcionado para a rota "" ', () => {
    render(<Login />);
    // const inputEmail = screen.getByTestId(emailTestId);
    // const inputPassword = screen.getByTestId(passwordTestId);
    // const loginBtn = screen.getByTestId(btnTestId);
    // userEvent.type(inputEmail, validEmail);
    // userEvent.type(inputPassword, '123');
    // userEvent.click(loginBtn);
    // expect(loginBtn).toBeDisabled();
  });
});
