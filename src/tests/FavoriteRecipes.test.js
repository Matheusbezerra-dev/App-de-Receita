import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const FAVORITE_RECIPES_PATHNAME = '/favorite-recipes';
const FIRST_RECIPE = '0-recipe-card';
const SECOND_RECIPE = '1-recipe-card';
const FIRST_NAME = '0-horizontal-name';
const SECOND_NAME = '1-horizontal-name';
const MEAL = 'Spicy Arrabiata Penne';
const DRINK = 'Aquamarine';

describe('Testa o componente FavoriteRecipes', () => {
  const storage = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', storage);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Testa se a pessoa é redirecionada para "/favorite-recipes"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PATHNAME);

    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });
  test('Testa se, ao filtrar pelo botão "ALL", todas as receitas continuam na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PATHNAME);

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
    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PATHNAME);

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
    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PATHNAME);

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
  test('Testa se, ao clicar no nome de uma receita, o usuário é redirecionado para a página de detalhes da receita clicada', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PATHNAME);

    const mealRecipe = screen.getByTestId(FIRST_NAME);
    userEvent.click(mealRecipe);
    expect(history.location.pathname).toBe('/meals/52771');

    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });

    const drinkRecipe = screen.getByTestId(SECOND_NAME);
    userEvent.click(drinkRecipe);
    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
