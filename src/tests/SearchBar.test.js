import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente SearchBar', () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });

  test('Testa se consegue mudar o input radio', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
  });
  test('Testa se exibe o alert se a pesquisa for maior que um caractere ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    expect(firstLetter).toBeInTheDocument();
    userEvent.click(firstLetter);

    const searchBtn = screen.getByTestId('button-search');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'aa');

    const execBtn = screen.getByTestId('exec-search-btn');
    expect(execBtn).toBeInTheDocument();
    userEvent.click(execBtn);

    expect(global.alert).toHaveBeenCalled();
  });
  test('Testa se, ao encontrar um resultado válido, os elementos são exibidos na tela', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });

    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const searchBtn = screen.getByTestId('button-search');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Corba');

    const execBtn = screen.getByTestId('exec-search-btn');
    expect(execBtn).toBeInTheDocument();
    userEvent.click(execBtn);
  });
});
