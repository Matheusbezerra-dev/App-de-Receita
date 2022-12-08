import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  useEffect(() => {
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
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, []);

  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes);
  }, []);

  function filterDoneRecipes(category) {
    if (category === 'all') {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(recipes);
    } else if (category === 'meal' || category === 'drink') {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const filtered = recipes.filter((recipe) => recipe.type === category);
      setDoneRecipes(filtered);
    }
  }

  function setUrlCopy(id, type) {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyMessage(true);
  }

  function redirectToDetails(id, type) {
    history.push(`/${type}s/${id}`);
  }

  const MAX_TIME = 1000;
  setTimeout(() => {
    setCopyMessage(false);
  }, MAX_TIME);

  return (
    <div>
      <Header titlePage="Done Recipes" buttonSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterDoneRecipes('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterDoneRecipes('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterDoneRecipes('drink') }
      >
        Drinks
      </button>
      {copyMessage ? <div><p>Link copied!</p></div> : <div /> }
      {doneRecipes.map((doneRecipe, index) => {
        if (doneRecipe.type === 'meal') {
          return (
            <div key={ doneRecipe.id } data-testid={ `${index}-recipe-card` }>
              <button
                type="button"
                onClick={ () => redirectToDetails(doneRecipe.id, doneRecipe.type) }
              >
                <img
                  className="recipe-img"
                  src={ doneRecipe.image }
                  alt={ doneRecipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </button>
              <button
                type="button"
                onClick={ () => redirectToDetails(doneRecipe.id, doneRecipe.type) }
              >
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {doneRecipe.name}
                </p>
              </button>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${doneRecipe.nationality} - ${doneRecipe.category}`}
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {doneRecipe.doneDate}
              </p>
              {doneRecipe.tags.slice(0, 2).map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}
              <button
                type="button"
                onClick={ () => setUrlCopy(doneRecipe.id, doneRecipe.type) }
              >
                <img
                  className="img"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="button"
                />
              </button>
            </div>
          );
        }
        return (
          <div key={ doneRecipe.id } data-testid={ `${index}-recipe-card` }>
            <button
              type="button"
              onClick={ () => redirectToDetails(doneRecipe.id, doneRecipe.type) }
            >
              <img
                className="recipe-img"
                src={ doneRecipe.image }
                alt={ doneRecipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </button>
            <button
              type="button"
              onClick={ () => redirectToDetails(doneRecipe.id, doneRecipe.type) }
            >
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {doneRecipe.name}
              </p>
            </button>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {doneRecipe.alcoholicOrNot}
            </p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {doneRecipe.doneDate}
            </p>
            <button
              type="button"
              onClick={ () => setUrlCopy(doneRecipe.id, doneRecipe.type) }
            >
              <img
                className="img"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="button"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
