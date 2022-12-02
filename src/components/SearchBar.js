import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const {
    filterSearch,
    setFilterSearch,
    resultSearch,
    requestAPI,
  } = useContext(AppContext);

  function handleChange({ target }) {
    setFilterSearch({
      ...filterSearch,
      filterOption: target.value,
    });
  }

  async function handleClick() {
    await requestAPI();
  }

  const MAX_LENGTH = 12;
  const { pathname } = useLocation();

  return (
    <div>
      <label htmlFor="ingredient-search">
        Ingredient
        <input
          type="radio"
          id="ingredient-search"
          name="filter-search"
          value="ingredient-search"
          onChange={ handleChange }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          type="radio"
          id="name-search"
          name="filter-search"
          value="name-search"
          onChange={ handleChange }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search">
        First letter
        <input
          type="radio"
          id="first-letter-search"
          name="filter-search"
          value="first-letter-search"
          onChange={ handleChange }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
      <div>
        {resultSearch && resultSearch.slice(0, MAX_LENGTH).map((result, index) => {
          if (pathname === '/meals') {
            return (
              <div key={ result.idMeal } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{result.strMeal}</p>
                <img
                  src={ result.strMealThumb }
                  alt={ result.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            );
          }
          return (
            <div key={ result.idDrink } data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{result.strDrink}</p>
              <img
                src={ result.strDrinkThumb }
                alt={ result.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
