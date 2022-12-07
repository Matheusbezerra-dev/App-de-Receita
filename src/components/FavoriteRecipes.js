import React, { useEffect, useState } from 'react';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteRecipes.css';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  useEffect(() => {
    const testItem = [
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
    localStorage.setItem('favoriteRecipes', JSON.stringify(testItem));
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoritesRecipes(favorites);
  }, []);

  function setUrlCopy(id, type) {
    copy(`http://localhost:3000/${type}s/${id}`);
  }

  function removeFavorite(id) {
    console.log(id);
    const filteredRecipes = favoritesRecipes.filter((favorite) => favorite.id !== id);
    setFavoritesRecipes(filteredRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
  }

  function filterFavorites(category) {
    if (category === 'all') {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoritesRecipes(favorites);
    } else if (category === 'meal' || category === 'drink') {
      const filtered = favoritesRecipes.filter((favorite) => favorite.type === category);
      setFavoritesRecipes(filtered);
    }
  }

  return (
    <div>
      <Header titlePage="Favorite Recipes" buttonSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterFavorites('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterFavorites('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterFavorites('drink') }
      >
        Drinks
      </button>
      {favoritesRecipes.map((favRecipe, index) => {
        if (favRecipe.type === 'meal') {
          return (
            <div key={ favRecipe.id } data-testid={ `${index}-recipe-card` }>
              <img
                className="recipe-img"
                src={ favRecipe.image }
                alt={ favRecipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{favRecipe.name}</p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${favRecipe.nationality} - ${favRecipe.category}`}
              </p>
              <img
                className="img"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="button"
                onClick={ () => setUrlCopy(favRecipe.id, favRecipe.type) }
              />
              <img
                className="img"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="button"
                onClick={ () => removeFavorite(favRecipe.id) }
              />
            </div>
          );
        }
        return (
          <div key={ favRecipe.id } data-testid={ `${index}-recipe-card` }>
            <img
              className="recipe-img"
              src={ favRecipe.image }
              alt={ favRecipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{favRecipe.name}</p>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {favRecipe.alcoholicOrNot}
            </p>
            <img
              className="img"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="button"
              onClick={ () => setUrlCopy(favRecipe.id, favRecipe.type) }
            />
            <img
              className="img"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="button"
              onClick={ () => removeFavorite(favRecipe.id) }
            />
          </div>
        );
      })}
    </div>
  );
}
