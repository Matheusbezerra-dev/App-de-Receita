import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import {
  ContainerSearchBar,
  LabelInput,
  ContainerLabel,
  ButtonSearch,
} from './SearchBarStyle';

function SearchBar() {
  const {
    filterSearch,
    setFilterSearch,
    resultSearch,
    requestAPI,
  } = useContext(AppContext);
  const history = useHistory();

  function handleChange({ target }) {
    setFilterSearch({
      ...filterSearch,
      filterOption: target.value,
    });
  }

  const handleClick = async () => {
    await requestAPI();
  };

  const MAX_LENGTH = 12;
  const { pathname } = useLocation();

  function redirectToDetails(id, type) {
    history.push(`/${type}/${id}`);
  }

  return (
    <div>
      <ContainerSearchBar>
        <ContainerLabel>
          <LabelInput htmlFor="ingredient-search">
            <input
              type="radio"
              id="ingredient-search"
              name="filter-search"
              value="ingredient-search"
              onChange={ handleChange }
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </LabelInput>
          <LabelInput htmlFor="name-search">
            <input
              type="radio"
              id="name-search"
              name="filter-search"
              value="name-search"
              onChange={ handleChange }
              data-testid="name-search-radio"
            />
            Name
          </LabelInput>
          <LabelInput htmlFor="first-letter-search">
            <input
              type="radio"
              id="first-letter-search"
              name="filter-search"
              value="first-letter-search"
              onChange={ handleChange }
              data-testid="first-letter-search-radio"
            />
            First letter
          </LabelInput>
        </ContainerLabel>
        <ButtonSearch
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          SEARCH
        </ButtonSearch>
      </ContainerSearchBar>
      <div>
        {resultSearch && resultSearch.slice(0, MAX_LENGTH).map((result, index) => {
          if (pathname === '/meals') {
            return (
              <div key={ result.idMeal } data-testid={ `${index}-recipe-card` }>
                <button
                  type="button"
                  onClick={ () => redirectToDetails(result.idMeal, 'meals') }
                >
                  <p data-testid={ `${index}-card-name` }>
                    {result.strMeal}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={ () => redirectToDetails(result.idMeal, 'meals') }
                >
                  <img
                    src={ result.strMealThumb }
                    alt={ result.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                </button>
              </div>
            );
          }
          return (
            <div key={ result.idDrink } data-testid={ `${index}-recipe-card` }>
              <button
                type="button"
                onClick={ () => redirectToDetails(result.idDrink, 'drinks') }
              >
                <p data-testid={ `${index}-card-name` }>{result.strDrink}</p>
              </button>
              <button
                type="button"
                onClick={ () => redirectToDetails(result.idMeal, 'meals') }
              >
                <img
                  src={ result.strDrinkThumb }
                  alt={ result.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
