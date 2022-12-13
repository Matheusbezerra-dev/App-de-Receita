import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import profileIcon from '../images/iconePerfil.png';
import searchIcon from '../images/iconePesquiar.png';
import logo from '../images/íconeRecipesApp.png';
import logoRecipes from '../images/logoRecipes.png';
import SearchBar from './SearchBar';
import LogoDrinks from '../images/icone-bebida.png';
import LogoMeals from '../images/icone-prato.png';
import {
  ContainerHeader,
  ContainerLogos,
  ContainerIcons,
  ContainerImg,
  ButtonSearch,
  ContainerTitle,
  TitleH1,
  ContainerSearch,
  LabelSearch,
} from './HeaderStyle';

export default function Header({ titlePage, buttonSearch }) {
  const [hiInput, setHiInput] = useState(false);
  const [img, setImg] = useState();

  const handleClick = () => (setHiInput(!hiInput));

  const { filterSearch, setFilterSearch } = useContext(AppContext);

  const mealsAndDrinks = useCallback(() => {
    if (titlePage === 'Meals') {
      setImg(<img src={ LogoMeals } alt="logo Meals" />);
    } else {
      setImg(<img src={ LogoDrinks } alt="logo Drinks" />);
    }
  }, [titlePage]);

  useEffect(() => {
    mealsAndDrinks();
  }, [mealsAndDrinks]);

  return (
    <ContainerHeader>
      <ContainerLogos>
        <ContainerImg>
          <img
            src={ logo }
            alt="Logo Recipes"
          />
          <img
            src={ logoRecipes }
            alt="Logo Recipes"
          />
        </ContainerImg>
        <ContainerIcons>
          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="icon"
              data-testid="profile-top-btn"
            />
          </Link>
          {buttonSearch && (
            <div>
              <div>
                <ButtonSearch
                  type="button"
                  onClick={ handleClick }
                  data-testid="button-search"
                >
                  <img
                    src={ searchIcon }
                    alt="SearchIcon"
                    data-testid="search-top-btn"
                  />
                </ButtonSearch>
              </div>
            </div>
          )}
        </ContainerIcons>
      </ContainerLogos>
      <ContainerTitle>
        {img}
        <TitleH1 data-testid="page-title">{ `${titlePage}`.toUpperCase() }</TitleH1>
      </ContainerTitle>
      <div>
        {hiInput && (
          <ContainerSearch>
            <LabelSearch htmlFor="search">
              <input
                type="text"
                data-testid="search-input"
                id="search"
                value={ filterSearch.valueSearch }
                onChange={ (e) => setFilterSearch({ ...filterSearch,
                  valueSearch: e.target.value }) }
              />
            </LabelSearch>
            <SearchBar />
          </ContainerSearch>
        )}
      </div>
    </ContainerHeader>
  );
}

Header.propTypes = {}.isrequerid;
