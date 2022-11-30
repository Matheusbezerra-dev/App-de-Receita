import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function SearchBar() {
  const {
    filterRadio,
    setFilterRadio,
    setFilterSearch,
    filterInputName,
  } = useContext(AppContext);

  function handleChange({ target }) {
    setFilterRadio(target.value);
  }

  function handleClick() {
    setFilterSearch({
      filterOption: filterRadio,
      valueSearch: filterInputName,
    });
  }

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
    </div>
  );
}

export default SearchBar;
