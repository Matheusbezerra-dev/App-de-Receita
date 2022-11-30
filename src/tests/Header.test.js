import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  test('Testa se ao clicar na lupa, aparece o input de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');

    setTimeout(() => {
      const searchBtn = screen.getByTestId('button-search');
      expect(searchBtn).toBeInTheDocument();
      userEvent.click(searchBtn);

      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toBeInTheDocument();
    }, 1500);
  });

  test('Testa se é possível digitar no input de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');

    setTimeout(() => {
      const searchBtn = screen.getByTestId('button-search');
      expect(searchBtn).toBeInTheDocument();
      userEvent.click(searchBtn);

      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toBeInTheDocument();
      userEvent.type(searchInput, 'Teste Digita');
      expect(searchInput).toHaveValue('Teste Digita');
    }, 1500);
  });
});
