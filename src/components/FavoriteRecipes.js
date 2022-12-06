import React, { useEffect, useState } from 'react';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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

  // * Todos os data-testids estão presentes:
  // * O botão de filtro `All` deve ter o atributo `data-testid="filter-by-all-btn"`;
  // * O botão de filtro `Meals` deve ter o atributo `data-testid="filter-by-meal-btn"`;
  // * O botão de `Drinks` deve ter o atributo `data-testid="filter-by-drink-btn"`;
  // * A imagem do card de receita deve ter o atributo `data-testid="${index}-horizontal-image"`;
  // * O texto da categoria da receita deve ter o atributo `data-testid="${index}-horizontal-top-text"`;
  // * O texto do nome da receita deve ter o atributo `data-testid="${index}-horizontal-name"`;
  // * O elemento de compartilhar a receita deve ter o atributo `data-testid="${index}-horizontal-share-btn"`;
  // * O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;

  return (
    <div>
      <Header titlePage="Favorite Recipes" buttonSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favoritesRecipes.map((favRecipe, index) => {
        if (favRecipe.type === 'meal') {
          return (
            <div key={ favRecipe.id } data-testid={ `${index}-recipe-card` }>
              <img
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
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="button"
              />
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="button"
              />
            </div>
          );
        }
        return (
          <div key={ favRecipe.id } data-testid={ `${index}-recipe-card` }>
            <img
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
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="button"
            />
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="button"
            />
          </div>
        );
      })}
    </div>
  );
}
