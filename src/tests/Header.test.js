import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import Meals from '../components/Meals';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  test('Testa se ao clicar na lupa, aparece o input de pesquisa', () => {
    const { history } = renderWithRouter(<Meals />);
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');

    const searchBtn = screen.getByTestId('button-search');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
