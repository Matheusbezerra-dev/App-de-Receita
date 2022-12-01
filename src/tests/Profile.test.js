import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

beforeEach(() => {
  localStorage.setItem('user', '{"email":"email@mail.com"}');
});

afterEach(() => {
  localStorage.clear();
});

describe('Testa o componente Profile', () => {
  test('Testa se a pessoa é redirecionada para "/profile"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/profile'); });
    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
  test('Testa se, ao clicar no botão "Done Recipes", o usuário é redirecionado para "/done-recipes" ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/profile'); });
    const doneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Testa se, ao clicar no botão "Favorite Recipes", o usuário é redirecionado para "/favorite-recipes" ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/profile'); });
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('Testa se, ao clicar no botão "Logout", o usuário é redirecionado para "/" e o localStorage é limpo ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/profile'); });
    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
    expect(history.location.pathname).toBe('/');
    const storage = localStorage.getItem('email');
    expect(storage).toBe(null);
  });
});
