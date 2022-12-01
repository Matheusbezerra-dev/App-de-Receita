import React from 'react';
import { Link } from 'react-router-dom';
import { RecipesLinks } from '../style/styled';

export default function Recipes(props) {
  const { cardInfo, type, name, index, idRoute, title } = props;

  return (

    <Link to={ `/${title}/${cardInfo[idRoute]}` }>
      <RecipesLinks data-testid={ `${index}-recipe-card` }>
        <img
          src={ cardInfo[type] }
          alt={ `${name}` }
          data-testid={ `${index}-card-img` }
        />
        <h4 data-testid={ `${index}-card-name` }>{cardInfo[name]}</h4>
      </RecipesLinks>
    </Link>
  );
}

Recipes.propTypes = {}.isRequired;
