import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const BUTTON_SEARCH = 'button-search';
const SEARCH_INPUT = 'search-input';

describe('Testa o componente Header', () => {
  test('Testa se ao clicar na lupa, aparece o input de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');

    const searchBtn = screen.getByTestId(BUTTON_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
  });

  test('Testa se é possível digitar no input de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');

    const searchBtn = screen.getByTestId(BUTTON_SEARCH);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'teste' } });
    expect(searchInput.value).toBe('teste');
  });
});
