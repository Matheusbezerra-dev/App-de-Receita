/* eslint-disable max-lines */
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/sharedIcon.png';
import AppContext from '../context/AppContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/FavoriteHead.png';
import {
  ContainerRecipesDetails,
  ButtonRecipesDetails,
  ImgRecipesDetails,
  DivOpacidade,
  ContainerRecipes,
  ContainerCategoryRecipes,
  ContainerButtonShared,
  ContainerIngredientsProgress,
  TitleH2,
  ContainerP,
  ButtonShared,
  Titleh3P,
  ContainerLabel,
} from './RecipeDetailsDetails';

const copy = require('clipboard-copy');

export default function RecipeInProgress() {
  const { titlePage } = useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const acess = titlePage === 'meals' ? 'Meal' : 'Drink';
  const nPageTitle = titlePage === 'meals' ? 'drinks' : 'meals';
  const [details, setDetails] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const fetchAPI = useCallback(async () => {
    let endpoint = '';
    if (titlePage === 'meals') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    setDetails(data[titlePage]);
  }, [id, titlePage]);

  const gettingProgress = useCallback(() => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (progress === null || progress.length === 0) {
      const progressObject = {
        [titlePage]: {
          [id]: [],
        },
        [nPageTitle]: {},
      };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
    }
    if (progress[titlePage][id]) {
      return setCheckedList([...progress[titlePage][id]]);
    }
    progress[titlePage][id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }, [id, nPageTitle, titlePage]);

  const getfavorites = useCallback(() => {
    const getfavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (getfavorite.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavorito(getfavorite.some((e) => e.id === id));
    }
  }, [id]);

  useEffect(() => {
    fetchAPI();
    gettingProgress();
    getfavorites();
  }, [fetchAPI, getfavorites, gettingProgress]);

  const getIngredients = useCallback(() => {
    if (details.length > 0) {
      const recipeIngredients = Object.entries(details[0]);
      const filteredRecipes = recipeIngredients
        .filter((e) => e[0].includes('strIngre'))
        .filter((e) => e[1] !== '' && e[1] !== null);
      setIngredient(filteredRecipes);
    }
  }, [details]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  useEffect(() => {
    if (checkedList.length === ingredient.length) setDisabled(false);
    else { setDisabled(true); }
  }, [checkedList, ingredient]);

  const handleClickCheck = (usedIngredient) => {
    const gettingLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (checkedList.includes(usedIngredient)) {
      setCheckedList(checkedList.filter((e) => e !== usedIngredient));
      gettingLocal[titlePage][id] = checkedList.filter((e) => e !== usedIngredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify(gettingLocal));
    } else {
      setCheckedList([...checkedList, usedIngredient]);
      gettingLocal[titlePage][id] = [...checkedList, usedIngredient];
      localStorage.setItem('inProgressRecipes', JSON.stringify(gettingLocal));
    }
  };

  const handleClickFavorite = () => {
    const nationality = acess === 'Meal' ? details[0].strArea : '';
    const alcoholic = acess === 'Drink' ? details[0].strAlcoholic : '';
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorito(!favorito);
    const newFavorite = {
      id,
      type: acess.toLowerCase(),
      nationality,
      category: details[0].strCategory,
      alcoholicOrNot: alcoholic,
      name: details[0][`str${acess}`],
      image: details[0][`str${acess}Thumb`],
    };
    if (favorites.length === 0) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    }
    if (favorites.some((e) => e.id === id)) {
      favorites = favorites
        .filter((el) => el.id !== id);
      return localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites]));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, newFavorite]));
  };

  const handleClickShared = () => {
    if (titlePage === 'meals') {
      const urlClip = `http://localhost:3000/meals/${id}`;
      copy(urlClip);
      setCopied(true);
    } else {
      const urlClip = `http://localhost:3000/drinks/${id}`;
      copy(urlClip);
      setCopied(true);
    }
  };

  const handleClickFinsh = () => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const nationality = acess === 'Meal' ? details[0].strArea : '';
    const alcoholic = acess === 'Drink' ? details[0].strAlcoholic : '';
    const tags = acess === 'Meal' ? details[0].strTags.split(',') : [];
    const newRecipe = {
      id,
      nationality,
      name: details[0][`str${acess}`],
      category: details[0].strCategory,
      image: details[0][`str${acess}Thumb`],
      tags,
      alcoholicOrNot: alcoholic,
      type: acess.toLowerCase(),
      doneDate: new Date(),
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...getDone, newRecipe]));
    history.push('/done-recipes');
  };

  return (
    <ContainerRecipesDetails>
      { details.length >= 1 && (
        <ContainerRecipes>
          <ImgRecipesDetails
            src={ details[0][`str${acess}Thumb`] }
            alt="recipe-ph"
            data-testid="recipe-photo"
            width="300px"
          />
          <DivOpacidade>  </DivOpacidade>
          <ContainerRecipes>
            <ContainerCategoryRecipes>
              <div>
                <h4 data-testid="recipe-category">{details[0].strCategory}</h4>
              </div>
              <ContainerButtonShared>
                <ButtonShared
                  type="button"
                  data-testid="share-btn"
                  onClick={ handleClickShared }
                >
                  {copied ? (<p>Link copied!</p>) : (
                    <img
                      src={ shareIcon }
                      alt="share"
                    />
                  )}
                </ButtonShared>
                {favorito ? (
                  <ButtonShared
                    type="button"
                    onClick={ handleClickFavorite }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="coração"
                      data-testid="favorite-btn"
                    />
                  </ButtonShared>
                ) : (
                  <ButtonShared
                    type="button"
                    onClick={ handleClickFavorite }
                  >
                    <img
                      src={ whiteHeartIcon }
                      alt="coração"
                      data-testid="favorite-btn"
                    />
                  </ButtonShared>
                )}
              </ContainerButtonShared>
            </ContainerCategoryRecipes>
            <Titleh3P data-testid="recipe-title">{details[0][`str${acess}`]}</Titleh3P>
          </ContainerRecipes>
        </ContainerRecipes>
      )}
      <ContainerIngredientsProgress>
        <TitleH2>Ingredients</TitleH2>
        <ContainerLabel>
          {ingredient.length > 0 && (
            ingredient.map((e, i) => (
              <label
                key={ i }
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ `checkbox${i}` }
                className={ checkedList.includes(e[1])
                  ? 'checkedInput' : 'nonCheckedInput' }
              >
                <input
                  type="checkbox"
                  id={ `checkbox${i}` }
                  checked={ !!checkedList.includes(e[1]) }
                  onChange={ () => handleClickCheck(e[1]) }
                />
                {e[1]}
              </label>
            ))
          )}
        </ContainerLabel>

        <TitleH2>Instructions</TitleH2>

        <ContainerP
          data-testid="instructions"
        >
          {details[0].strInstructions}
        </ContainerP>

      </ContainerIngredientsProgress>

      <ButtonRecipesDetails
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ handleClickFinsh }
      >
        Finish Recipe
      </ButtonRecipesDetails>
    </ContainerRecipesDetails>
  );
}

RecipeInProgress.propTypes = {}.isRequired;
