import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const idMeal = '/meals/52977';
const idDrink = '/drinks/15997';

describe('Testa o componente Recipes', () => {
  test('Testa se possui a imagem da comida na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(idMeal);
    });
    const mealsImg = screen.getByRole('img', {
      name: /corba/i,
    });
    expect(mealsImg).toBeInTheDocument();
    userEvent.click(mealsImg);
  });
  test('Testa se possui a imagem da bebida na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(idDrink);
    });
    const drinkImg = screen.getByRole('img', {
      name: /gg/i,
    });
    expect(drinkImg).toBeInTheDocument();
    userEvent.click(drinkImg);
  });

  test('Test se a img de drink faz o link com a rota /drinks', () => {
    const { history } = renderWithRouter(<App />, '/Drinks');
    act(() => {
      history.push(idDrink);
    });
    const drinkLink = screen.getByRole('img', {
      name: /gg/i,
    });
    expect(drinkLink).toBeInTheDocument();
    userEvent.click(drinkLink);
  });
  test('Test se a img de drink faz o link com a rota /drinks', () => {
    const { history } = renderWithRouter(<App />, '/Drinks');
    act(() => {
      history.push(idMeal);
    });
    const mealsLink = screen.getByRole('img', {
      name: /corba/i,
    });
    expect(mealsLink).toBeInTheDocument();
    userEvent.click(mealsLink);
  });

  test('Testa se há o nome da receita na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(idMeal);
    });
    const nameMeal = screen.findByText(/Corba/i);
    expect(nameMeal).toBeInTheDocument();
  });
  test('Testa se há o nome da receita na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(idDrink);
    });
    const nameDrink = screen.findByText(/gg/i);
    expect(nameDrink).toBeInTheDocument();
  });
});
