/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import Shared from '../images/sharedIcon.png';
import {
  ContainerRecipesDetails,
  ButtonRecipesDetails,
  ImgRecipesDetails,
  DivOpacidade,
  ContainerRecipes,
  ContainerCategoryRecipes,
  ContainerButtonShared,
  ContainerIngredients,
  ContainerUl,
  TitleH2,
  ContainerP,
  IframeContainer,
  ContainerCarousel,
  ButtonShared,
  TextSpan,
  Titleh3P,
} from './RecipeDetailsDetails';
import blackHeart from '../images/FavoriteHead.png';
import whiteHeart from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function RecipeDetails() {
  const { favorite, showFavorite, details, setDetails } = useContext(AppContext);
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const [recommendationMeals, setRecommendationMeals] = useState([]);
  const [recommendationDrinks, setRecommendationDrinks] = useState([]);
  const [startButton, setStartButton] = useState(true);
  const [shared, setShared] = useState(false);
  const { id } = useParams();
  const titlePage = history.location.pathname.includes('meals') ? 'meals' : 'drinks';

  const fetchAPI = useCallback(async () => {
    let endpoint = '';
    if (titlePage === 'meals') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    if (Object.keys(data)[0] === 'meals') {
      setDetails(data.meals[0]);
    } else {
      setDetails(data.drinks[0]);
    }
  }, [id, setDetails, titlePage]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const handleClick = () => {
    if (titlePage === 'meals') {
      return history.push(`/meals/${id}/in-progress`);
    } return history.push(`/drinks/${id}/in-progress`);
  };

  const handleClickShared = () => {
    if (titlePage === 'meals') {
      const url = `http://localhost:3000/meals/${id}`;
      copy(url);
      setShared(true);
    } else {
      const url = `http://localhost:3000/drinks/${id}`;
      copy(url);
      setShared(true);
    }
  };

  const getIngredients = useCallback(() => {
    if (details) {
      const filterIngredients = Object.entries(details);
      const validIngredients = filterIngredients
        .filter((e) => e[0].includes('strIngredient'))
        .filter((i) => i[1] !== null && i[1] !== '');
      const validQuantity = filterIngredients
        .filter((e) => e[0].includes('strMeasure'))
        .filter((i) => i[1] !== null && i[1] !== '');
      if (titlePage === 'meals') {
        setIngredients(validIngredients
          .map((e, i) => `${e[1]}: ${validQuantity[i][1]}`));
      } else {
        setIngredients(validIngredients.map((e, i) => {
          const quantity = validQuantity[i] ? (`: ${validQuantity[i][1]}`) : '';
          return `${e[1]}${quantity}`;
        }));
      }
    }
  }, [details, titlePage]);

  useEffect(() => {
    getIngredients();
  }, [details, getIngredients]);

  const fetchAPIRecommendations = useCallback(async () => {
    let endpoint = '';
    const MAX_LENGTH = 6;
    if (titlePage === 'meals') {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    } else {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    if (titlePage === 'meals') {
      const { drinks } = data;
      setRecommendationDrinks(drinks.slice(0, MAX_LENGTH));
    } else {
      const { meals } = data;
      setRecommendationMeals(meals.slice(0, MAX_LENGTH));
    }
  }, [titlePage]);

  useEffect(() => {
    fetchAPIRecommendations();
  }, [fetchAPIRecommendations, titlePage]);

  const getInprogress = useCallback(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const continueRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (titlePage === 'meals') {
        const newData = Object.keys(continueRecipes.meals);
        const recipe = newData.some((e) => e === id);
        setStartButton(!recipe);
      } else {
        const newData = Object.keys(continueRecipes.drinks);
        const recipe = newData.some((e) => e === id);
        setStartButton(!recipe);
      }
    }
  }, [id, titlePage]);

  useEffect(() => {
    getInprogress();
  }, [getInprogress]);

  return (
    <ContainerRecipesDetails>
      <ContainerRecipes>
        <ImgRecipesDetails
          src={ details.strMealThumb || details.strDrinkThumb }
          alt="recipeImg"
          data-testid="recipe-photo"
          width="200"
        />
        <DivOpacidade>  </DivOpacidade>
        <ContainerRecipes>
          <ContainerCategoryRecipes>
            <div>
              <h4 data-testid="recipe-category">
                { details.strAlcoholic || details.strCategory }
              </h4>
            </div>
            <ContainerButtonShared>
              <ButtonShared
                type="button"
                data-testid="share-btn"
                onClick={ handleClickShared }
              >
                <img
                  src={ Shared }
                  alt="logo shared"
                />
              </ButtonShared>
              {shared && <TextSpan>Link copied!</TextSpan>}
              {showFavorite === false ? (
                <ButtonShared type="button" onClick={ favorite }>
                  <img src={ whiteHeart } alt="heartWhite" data-testid="favorite-btn" />
                </ButtonShared>
              ) : (
                <ButtonShared type="button" onClick={ favorite }>
                  <img src={ blackHeart } alt="heartBlack" data-testid="favorite-btn" />
                </ButtonShared>
              )}
            </ContainerButtonShared>
          </ContainerCategoryRecipes>
          <div>
            <Titleh3P data-testid="recipe-title">
              { `${details.strMeal}`.toUpperCase() || `${details.strDrink}`.toUpperCase }
            </Titleh3P>
          </div>
        </ContainerRecipes>
      </ContainerRecipes>
      <ContainerIngredients>
        <TitleH2>Ingredients</TitleH2>
        <ContainerUl>
          {ingredients
          && ingredients.map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {e}
            </li>
          ))}
        </ContainerUl>

        <TitleH2>Instructions</TitleH2>
        <ContainerP data-testid="instructions">
          { details.strInstructions }
        </ContainerP>
        <TitleH2>Video</TitleH2>
        <IframeContainer
          name={ details.strMeal || details.strDrink }
          title={ details.strMeal || details.strDrink }
          data-testid="video"
          width="335"
          height="285"
          src={ details.strYoutube || details.strVideo }
        />
      </ContainerIngredients>
      <ContainerCarousel>
        {titlePage === 'meals'
          ? (
            <Carousel fade>
              {recommendationDrinks.map((e, i) => (
                <Carousel.Item key={ i }>
                  <div data-testid={ `${i}-recommendation-card` }>
                    <img
                      src={ e.strDrinkThumb }
                      alt={ e.strDrink }
                      width="250px"
                      height="250px"
                    />
                    <div data-testid={ `${i}-recommendation-title` }>
                      <p>{e.strDrink}</p>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )
          : (
            <Carousel fade>
              {recommendationMeals.map((e, i) => (
                <Carousel.Item key={ i }>
                  <div data-testid={ `${i}-recommendation-card` }>
                    <img
                      src={ e.strMealThumb }
                      alt={ e.strMeal }
                      width="250px"
                      height="250px"
                    />
                    <div data-testid={ `${i}-recommendation-title` }>
                      <p>{e.strMeal}</p>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
      </ContainerCarousel>
      <ButtonRecipesDetails
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {startButton ? ('Start Recipe') : ('Continue Recipe')}
      </ButtonRecipesDetails>
    </ContainerRecipesDetails>
  );
}
RecipeDetails.propTypes = {}.isRequired;
