import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';
import {
  ButtonCategory,
  ContainerButtonCategory,
  ContainerRevenues,
  ContainerRe,
} from './BodyRecipesStyle';
import All from '../images/All.png';
import Beef from '../images/Beef.png';
import Breakfast from '../images/Breakfast.png';
import Chicken from '../images/Chicken.png';
import Dessert from '../images/Dessert.png';
import Goat from '../images/Goat.png';
import OrdinaryDrink from '../images/Drink.png';
import Cocoa from '../images/Cocoa.png';
import Cocktail from '../images/Cocktail.png';
import Shake from '../images/Shake.png';
import Other from '../images/Other.png';
import AllDrinks from '../images/AllDrinks.png';

const logoCategoryMeals = [
  { name: 'Beef', image: Beef },
  { name: 'Breakfast', image: Breakfast },
  { name: 'Chicken', image: Chicken },
  { name: 'Dessert', image: Dessert },
  { name: 'Goat', image: Goat },
];

const logoCategoryDrinks = [
  { name: 'Cocktail', image: Cocktail },
  { name: 'Cocoa', image: Cocoa },
  { name: 'Ordinary Drink', image: OrdinaryDrink },
  { name: 'Other / Unknown', image: Other },
  { name: 'Shake', image: Shake },
];

export default function BobyRecipes({ title }) {
  const history = useHistory();
  const {
    filterSearch,
    setFilterSearch,
    renderedSearchResults,
  } = useContext(AppContext);

  const [revenues, setRevenues] = useState([]);
  const [category, setCategory] = useState([]);
  const [defaultRevenues, setDefaultRevenues] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');

  const { pathname } = useLocation();

  const maxRender = 12;
  const maxCategory = 5;
  const idRoute = title === 'Drinks' ? 'idDrink' : 'idMeal';
  const pageName = title === 'Drinks' ? 'Drink' : 'Meal';
  const endPointParam = title === 'Drinks' ? 'thecocktaildb' : 'themealdb';

  const revenuesParam = useCallback((param) => {
    const data = param[title.toLowerCase()];
    if (data === null) {
      return global.alert('Sorry, we\'t found any recipes for these filters.');
    }
    if (data.length === 1) {
      return history.push(`/${title.toLowerCase()}/${data[0][idRoute]}`);
    }
    setRevenues(data.slice(0, maxRender));
  }, [history, title, idRoute]);

  const revenuesFetch = useCallback(async (paramType, paraminput) => {
    const letter = paramType === 'Name' ? 's' : 'f';
    if (paramType === 'Ingredient') {
      const endPoint = await fetch(`https://www.${endPointParam}.com/api/json/v1/1/filter.php?i=${paraminput}`);
      const data = await endPoint.json();
      revenuesParam(data);
    }
    if (paramType === 'Name' || paramType === 'Fist Letter') {
      const endPoint = await fetch(`https://www.${endPointParam}.com/api/json/v1/1/search.php?${letter}=${paraminput}`);
      const data = await endPoint.json();
      revenuesParam(data);
    }
  }, [revenuesParam, endPointParam]);

  useEffect(() => {
    const getCategorys = async () => {
      const endPoint = await fetch(`https://www.${endPointParam}.com/api/json/v1/1/list.php?c=list`);
      const data = await endPoint.json();
      const categoryRender = data[title.toLowerCase()].slice(0, maxCategory);
      setCategory(categoryRender);
    };

    const getRevenues = async () => {
      const endPoint = await fetch(`https://www.${endPointParam}.com/api/json/v1/1/search.php?s=`);
      const response = await endPoint.json();
      const data = response[title.toLowerCase()];
      setDefaultRevenues(data);
      const revenuesRender = [...data.slice(0, maxRender)];
      setRevenues(revenuesRender);
    };

    getCategorys();
    getRevenues();
  }, [endPointParam, title]);

  // buscando o resultado da categoria clicando pelo botão.
  useEffect(() => {
    async function handleSearchCategory() {
      if (filterCategory) {
        const response = await fetch(`https://www.${endPointParam}.com/api/json/v1/1/filter.php?c=${filterCategory}`);
        const json = await response.json();
        setRevenues(json[title.toLowerCase()].slice(0, maxRender));
      }
    }
    handleSearchCategory();
  }, [filterCategory, title, endPointParam]);

  useEffect(() => {
    if (filterSearch.search === true) {
      revenuesFetch(filterSearch.parameters[0], filterSearch.parameters[1]);
      setFilterSearch({
        filterOption: false,
        valueSearch: [],
      });
    }
  }, [filterSearch, revenuesFetch, setFilterSearch]);

  const handleCategory = (param) => {
    if (filterCategory === param) {
      setFilterCategory('');
      setRevenues([...defaultRevenues.slice(0, maxRender)]);
    } else {
      setFilterCategory(param);
    }
  };

  const handleCategoryAll = () => {
    setRevenues([...defaultRevenues.slice(0, maxRender)]);
  };

  return (
    <ContainerRe>
      <ContainerButtonCategory>
        <ButtonCategory
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleCategoryAll() }
        >
          {pathname === '/meals' ? <img
            src={ All }
            alt={ All }
          /> : <img
            src={ AllDrinks }
            alt={ AllDrinks }
          />}
        </ButtonCategory>
        {category && category.map(({ strCategory }) => (
          <ButtonCategory
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleCategory(strCategory) }
          >
            {pathname === '/meals' ? <img
              src={ logoCategoryMeals.sort((a, b) => b.name - a.name)
                .filter((logo) => logo.name === strCategory)
                .map((logo) => logo.image) }
              alt={ strCategory }
            /> : <img
              src={ logoCategoryDrinks.sort((a, b) => b.name - a.name)
                .filter((logo) => logo.name === strCategory)
                .map((logo) => logo.image) }
              alt={ strCategory }
            /> }
          </ButtonCategory>
        ))}
      </ContainerButtonCategory>
      <ContainerRevenues>
        {!renderedSearchResults && revenues && (
          revenues.map((revenue, index) => (
            <Recipes
              title={ title.toLowerCase() }
              idRoute={ idRoute }
              cardInfo={ revenue }
              type={ `str${pageName}Thumb` }
              name={ `str${pageName}` }
              index={ index }
              key={ index }
            />
          ))
        )}
      </ContainerRevenues>
    </ContainerRe>
  );
}

BobyRecipes.propTypes = {}.isRequired;
