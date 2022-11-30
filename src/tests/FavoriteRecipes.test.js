import React from 'react';
import { act, screen } from '@testing-library/react';
import FavoriteRecipes from '../components/FavoriteRecipes';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente FavoriteRecipes', () => {
  test('Testa se a pessoa é redirecionada para "/favorite-recipes"', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    act(() => { history.push('/favorite-recipes'); });
    expect(history.location.pathname).toBe('/favorite-recipes');
    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });
});
