import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function RecipeDetails() {
  const history = useHistory();
  const [details, setDetails] = useState({});

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

  console.log(details);
  return (
    <div>
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

        </ul>
      </div>

      <p data-testid="recipe-category">
        { details.strAlcoholic || details.strCategory }
      </p>

      <p data-testid="instructions">
        { details.strInstructions }
      </p>

      <iframe
        title={ details.strMeal || details.strDrink }
        data-testid="video"
        width="420"
        height="315"
        src={ details.strYoutube || details.strVideo }
      />
    </div>
  );
}

RecipeDetails.propTypes = {}.isRequired;
