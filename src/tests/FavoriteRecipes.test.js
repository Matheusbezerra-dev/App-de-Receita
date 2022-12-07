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

const FAVORITE_RECIPES_PATHNAME = '/favorite-recipes';
const FIRST_RECIPE = '0-recipe-card';
const SECOND_RECIPE = '1-recipe-card';
const FIRST_NAME = '0-horizontal-name';
const SECOND_NAME = '1-horizontal-name';
const MEAL = 'Spicy Arrabiata Penne';
const DRINK = 'Aquamarine';
const FIRST_IMAGE = '0-horizontal-image';
const SECOND_IMAGE = '1-horizontal-image';
const FIRST_FAV_BTN = '0-horizontal-favorite-btn';
const SECOND_FAV_BTN = '1-horizontal-favorite-btn';
const FIRST_SHARE_BTN = '0-horizontal-share-btn';
const SECOND_SHARE_BTN = '1-horizontal-share-btn';

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
    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
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
  test('Testa se, ao clicar nos nomes das receita, o usuário é redirecionado para a página de detalhes da receita clicada', () => {
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
  test('Testa se, ao clicar nas imagens das receita, o usuário é redirecionado para a página de detalhes da receita clicada', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PATHNAME);

    const mealRecipe = screen.getByTestId(FIRST_IMAGE);
    userEvent.click(mealRecipe);
    expect(history.location.pathname).toBe('/meals/52771');

    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });

    const drinkRecipe = screen.getByTestId(SECOND_IMAGE);
    userEvent.click(drinkRecipe);
    expect(history.location.pathname).toBe('/drinks/178319');
  });
  test('Testa se, ao clicar no botão de favoritos, a receita é retirada da tela e do localstorage', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PATHNAME);

    const firstRecipe = screen.getByTestId(FIRST_NAME);
    const secondRecipe = screen.getByTestId(SECOND_NAME);
    expect(firstRecipe).toBeInTheDocument();
    expect(secondRecipe).toBeInTheDocument();

    const mealFavoriteButton = screen.getByTestId(FIRST_FAV_BTN);
    const drinkFavoriteButton = screen.getByTestId(SECOND_FAV_BTN);
    expect(mealFavoriteButton).toBeInTheDocument();
    expect(drinkFavoriteButton).toBeInTheDocument();
    userEvent.click(mealFavoriteButton);

    const newFirstRecipe = screen.getByTestId(FIRST_NAME);
    expect(newFirstRecipe).toHaveTextContent(DRINK);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toMatchObject([storage[1]]);

    const newFavoriteButton = screen.getByTestId(FIRST_FAV_BTN);
    userEvent.click(newFavoriteButton);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toMatchObject([]);
  });
  test('Testa se, ao clicar no botão compartilhar, a o link é copiado para o clipboard', () => {
    navigator.clipboard.writeText = jest.fn();

    const { history } = renderWithRouter(<App />);
    act(() => { history.push(FAVORITE_RECIPES_PATHNAME); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PATHNAME);

    const firstShareButton = screen.getByTestId(FIRST_SHARE_BTN);
    const secondShareButton = screen.getByTestId(SECOND_SHARE_BTN);
    expect(firstShareButton).toBeInTheDocument();
    expect(secondShareButton).toBeInTheDocument();

    userEvent.click(firstShareButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
    userEvent.click(secondShareButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });
});
