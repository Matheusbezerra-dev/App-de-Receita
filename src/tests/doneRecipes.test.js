import React from 'react';
import { act, screen } from '@testing-library/react';
import DoneRecipes from '../components/DoneRecipes';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Drinks', () => {
  test('Testa se a pessoa é redirecionada para "/done-recipes"', () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    act(() => { history.push('/done-recipes'); });
    expect(history.location.pathname).toBe('/done-recipes');
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });
});
