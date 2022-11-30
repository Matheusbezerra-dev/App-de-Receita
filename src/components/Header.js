import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ titlePage, buttonSearch }) {
  const [hiInput, setHiInput] = useState(false);

  const handleClick = () => (setHiInput(!hiInput));

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
    </header>
  );
}

Header.propTypes = {}.isrequerid;
