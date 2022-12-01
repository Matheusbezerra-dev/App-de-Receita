import React from 'react';
import { screen } from '@testing-library/react';
import Recipes from '../components/Recipes';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Recipes', () => {
  test('Testa se renderiza a página Recipes', () => {
    renderWithRouter(<Recipes />);
    expect(screen.getByText('Recipes')).toBeInTheDocument();
  });
});
