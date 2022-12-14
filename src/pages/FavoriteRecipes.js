import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
/* import '../components/FavoriteRecipes.css'; */

import {
  ContainerButtonsTop,
  ButtonAll,
  ButtonMeals,
  ButtonDrinks,
  ImgFavorite,
  DivFavoriteCard,
  ContainerFavorite,
  AllButtonsBySideRecipeImg,
  NameCategoryFavorite,
  CategoryRecipeCard,
  ButtonNameFavorite,
  NameFavorite,
  ButtonShareAndFavorite,
  ButtonShare,
  ImageShare,
} from './FavoriteRecipesStyle';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoritesRecipes(favorites);
  }, []);

  function setUrlCopy(id, type) {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyMessage(true);
  }

  function removeFavorite(id) {
    const filteredRecipes = favoritesRecipes.filter((favorite) => favorite.id !== id);
    setFavoritesRecipes(filteredRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
  }

  function filterFavorites(category) {
    if (category === 'all') {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoritesRecipes(favorites);
    } else if (category === 'meal' || category === 'drink') {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filtered = favorites.filter((favorite) => favorite.type === category);
      setFavoritesRecipes(filtered);
    }
  }

  function redirectToDetails(id, type) {
    history.push(`/${type}s/${id}`);
  }

  const MAX_TIME = 1000;
  setTimeout(() => {
    setCopyMessage(false);
  }, MAX_TIME);

  return (
    <>
      <ContainerFavorite>
        <Header titlePage="Favorite Recipes" buttonSearch={ false } />
        <ContainerButtonsTop>
          <ButtonAll
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => filterFavorites('all') }
          >
            All
          </ButtonAll>
          <ButtonMeals
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => filterFavorites('meal') }
          >
            Meals
          </ButtonMeals>
          <ButtonDrinks
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterFavorites('drink') }
          >
            Drinks
          </ButtonDrinks>
        </ContainerButtonsTop>
        {copyMessage ? <div><p>Link copied!</p></div> : <div /> }
        {favoritesRecipes.map((favRecipe, index) => {
          if (favRecipe.type === 'meal') {
            return (
              <DivFavoriteCard
                key={ favRecipe.id }
                data-testid={ `${index}-recipe-card` }
              >
                <div>
                  <button
                    type="button"
                    onClick={ () => redirectToDetails(favRecipe.id, favRecipe.type) }
                  >
                    <ImgFavorite
                      // className="recipe-img"
                      src={ favRecipe.image }
                      alt={ favRecipe.name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </button>
                </div>
                <AllButtonsBySideRecipeImg>
                  <NameCategoryFavorite>
                    <ButtonNameFavorite
                      type="button"
                      onClick={ () => redirectToDetails(favRecipe.id, favRecipe.type) }
                    >
                      <NameFavorite
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {favRecipe.name}
                      </NameFavorite>
                    </ButtonNameFavorite>
                    <CategoryRecipeCard
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${favRecipe.nationality} - ${favRecipe.category}`}
                    </CategoryRecipeCard>
                  </NameCategoryFavorite>
                  <ButtonShareAndFavorite>
                    <ButtonShare
                      type="button"
                      onClick={ () => setUrlCopy(favRecipe.id, favRecipe.type) }
                    >
                      <ImageShare
                        className="img"
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="button"
                      />
                    </ButtonShare>
                    <button
                      type="button"
                      onClick={ () => removeFavorite(favRecipe.id) }
                    >
                      <img
                        className="img"
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="button"
                      />
                    </button>
                  </ButtonShareAndFavorite>
                </AllButtonsBySideRecipeImg>
              </DivFavoriteCard>
            );
          }
          return (
            <div key={ favRecipe.id } data-testid={ `${index}-recipe-card` }>
              <button
                type="button"
                onClick={ () => redirectToDetails(favRecipe.id, favRecipe.type) }
              >
                <img
                  className="recipe-img"
                  src={ favRecipe.image }
                  alt={ favRecipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </button>
              <button
                type="button"
                onClick={ () => redirectToDetails(favRecipe.id, favRecipe.type) }
              >
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {favRecipe.name}
                </p>
              </button>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {favRecipe.alcoholicOrNot}
              </p>
              <button
                type="button"
                onClick={ () => setUrlCopy(favRecipe.id, favRecipe.type) }
              >
                <img
                  className="img"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="button"
                />
              </button>
              <button
                type="button"
                onClick={ () => removeFavorite(favRecipe.id) }
              >
                <img
                  className="img"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="button"
                />
              </button>
            </div>
          );
        })}
      </ContainerFavorite>
      <Footer />
    </>
  );
}
