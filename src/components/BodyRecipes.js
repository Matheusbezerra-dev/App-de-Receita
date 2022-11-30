import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recipes from './Recipes';
import { ContainerRevenues } from '../style/styled';

export default function BobyRecipes({ title }) {
  const history = useHistory();
  const {
    filterSearch,
    setFilterSearch,
  } = useContext(AppContext);

  const [revenues, setRevenues] = useState([]);
  const [category, setCategory] = useState([]);
  const [defaultRevenues, setDefaultRevenues] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');

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
    <ContainerRevenues>
      <section>
        {category && category.map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleCategory(strCategory) }
          >
            {strCategory}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleCategoryAll() }
        >
          All
        </button>
      </section>

      {revenues && (
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
  );
}

BobyRecipes.propTypes = {}.isRequired;
