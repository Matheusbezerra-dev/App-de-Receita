import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente FavoriteRecipes', () => {
  test('Testa se a pessoa é redirecionada para "/favorite-recipes"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/favorite-recipes'); });
    expect(history.location.pathname).toBe('/favorite-recipes');

    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });
});
