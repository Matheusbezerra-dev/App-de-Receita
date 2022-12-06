import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
// import { Carousel } from 'react-bootstrap';
import { ContainerRecipesDetails } from '../style/styled';

export default function RecipeDetails() {
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const id = history.location.pathname.split('/')[2];
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
  }, [id, titlePage]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

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

  const [recommendationMeals, setRecommendationMeals] = useState({});
  const [recommendationDrinks, setRecommendationDrinks] = useState({});

  const fetchAPIRecommendations = useCallback(async () => {
    let endpoint = '';
    const MAX_LENGTH = 12;
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
  console.log('====================================');
  console.log(recommendationDrinks);
  console.log('===================================');
  console.log(recommendationMeals);
  console.log('====================================');

  useEffect(() => {
    fetchAPIRecommendations();
  }, [fetchAPIRecommendations, titlePage]);

//   const Carousel = (<Carousel>
//   <Carousel.Item>
      
//   </Carousel.Item>
// </Carousel>)

  return (
    <ContainerRecipesDetails>
      <h3 data-testid="recipe-title">
        { details.strMeal || details.strDrink }
      </h3>

      <img
        src={ details.strMealThumb || details.strDrinkThumb }
        alt="recipeImg"
        data-testid="recipe-photo"
        width="200"
      />

      <div>
        <h2>Ingredients</h2>
        <ul>
          {ingredients
          && ingredients.map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {e}
            </li>
          ))}
        </ul>
      </div>

      <h4 data-testid="recipe-category">
        { details.strAlcoholic || details.strCategory }
      </h4>

      <p data-testid="instructions">
        { details.strInstructions }
      </p>

      <iframe
        title={ details.strMeal || details.strDrink }
        data-testid="video"
        width="320"
        height="280"
        src={ details.strYoutube || details.strVideo }
      />
    </ContainerRecipesDetails>
  );
}

RecipeDetails.propTypes = {}.isRequired;
