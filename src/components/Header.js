import React from 'react';
import profileIcon from '../images/profileIcon.svg';

export default function Header() {
  return (
    <header>
      <label htmlFor="search">
        <input
          placeholder="Pesquisar"
          type="text"
          id="search"
          data-testid="search-top-btn"
        />
      </label>
      <img src={ profileIcon } alt="icon" data-testid="profile-top-btn" />
      <h1 data-testid="page-title">
        Recipes App
      </h1>

    </header>
  );
}
