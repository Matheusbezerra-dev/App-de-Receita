import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
}); // Baseado no https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

const DONE_RECIPES_PATHNAME = '/done-recipes';
const FIRST_RECIPE = '0-recipe-card';
const SECOND_RECIPE = '1-recipe-card';
const FIRST_NAME = '0-horizontal-name';
const SECOND_NAME = '1-horizontal-name';
const MEAL = 'Spicy Arrabiata Penne';
const DRINK = 'Aquamarine';
// const FIRST_IMAGE = '0-horizontal-image';
// const SECOND_IMAGE = '1-horizontal-image';
// const FIRST_FAV_BTN = '0-horizontal-favorite-btn';
// const SECOND_FAV_BTN = '1-horizontal-favorite-btn';
// const FIRST_SHARE_BTN = '0-horizontal-share-btn';
// const SECOND_SHARE_BTN = '1-horizontal-share-btn';

describe('Testa o componente Drinks', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Testa se a pessoa é redirecionada para "/done-recipes"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/done-recipes'); });
    expect(history.location.pathname).toBe(DONE_RECIPES_PATHNAME);

    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });
  test('Testa se, ao filtrar pelo botão "ALL", todas as receitas continuam na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(DONE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(DONE_RECIPES_PATHNAME);

    const allButton = screen.getByTestId('filter-by-all-btn');
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    const recipeCardOne = screen.getByTestId(FIRST_RECIPE);
    expect(recipeCardOne).toBeInTheDocument();

    const recipeOneName = screen.getByTestId(FIRST_NAME);
    expect(recipeOneName).toHaveTextContent(MEAL);

    const recipeCardTwo = screen.getByTestId(SECOND_RECIPE);
    expect(recipeCardTwo).toBeInTheDocument();

    const recipeTwoName = screen.getByTestId(SECOND_NAME);
    expect(recipeTwoName).toHaveTextContent(DRINK);
  });
  test('Testa se, ao filtrar pelo botão "MEALS", apenas comidas são renderizadas na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(DONE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(DONE_RECIPES_PATHNAME);

    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    expect(mealsButton).toBeInTheDocument();
    userEvent.click(mealsButton);

    const recipeCardOne = screen.getByTestId(FIRST_RECIPE);
    expect(recipeCardOne).toBeInTheDocument();

    const recipeOneName = screen.getByTestId(FIRST_NAME);
    expect(recipeOneName).toHaveTextContent(MEAL);

    const recipeCardTwo = screen.queryByTestId(SECOND_RECIPE);
    expect(recipeCardTwo).toBe(null);
  });
  test('Testa se, ao filtrar pelo botão "DRINKS", apenas bebidas são renderizadas na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(DONE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(DONE_RECIPES_PATHNAME);

    const drinksButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinksButton).toBeInTheDocument();
    userEvent.click(drinksButton);

    const recipeCardOne = screen.getByTestId(FIRST_RECIPE);
    expect(recipeCardOne).toBeInTheDocument();

    const recipeOneName = screen.getByTestId(FIRST_NAME);
    expect(recipeOneName).toHaveTextContent(DRINK);

    const recipeCardTwo = screen.queryByTestId(SECOND_RECIPE);
    expect(recipeCardTwo).toBe(null);
  });
});
