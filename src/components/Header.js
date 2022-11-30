import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ titlePage, buttonSearch }) {
  const [hiInput, setHiInput] = useState(false);

  const handleClick = () => (setHiInput(!hiInput));

  const { setFilterInputName } = useContext(AppContext);

  function handleChangeSearchInput({ target }) {
    setFilterInputName(target.value);
  }

  return (
    <header>
      <h1 data-testid="page-title">{titlePage}</h1>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="icon"
          data-testid="profile-top-btn"
        />
      </Link>
      {hiInput && (
        <label htmlFor="search">
          <input
            type="text"
            data-testid="search-input"
            id="search"
            onChange={ handleChangeSearchInput }
          />
        </label>
      )}
      {buttonSearch && (
        <div>
          <button
            type="button"
            onClick={ handleClick }
            data-testid="button-search"
          >
            <img
              src={ searchIcon }
              alt="SearchIcon"
              data-testid="search-top-btn"
            />
          </button>
        </div>)}
      <SearchBar />
    </header>
  );
}

Header.propTypes = {}.isrequerid;
