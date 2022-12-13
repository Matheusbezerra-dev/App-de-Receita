import React from 'react';
import { Link } from 'react-router-dom';
/* import { RecipesLinks } from '../style/styled'; */

import {
  RecipesLinks,
  ImageCard,
  DivCardH4,
} from '../pages/CardRecipeStyle';

export default function Recipes(props) {
  const { cardInfo, type, name, index, idRoute, title } = props;

  return (

    <Link to={ `/${title}/${cardInfo[idRoute]}` }>
      <RecipesLinks data-testid={ `${index}-recipe-card` }>
        <ImageCard
          src={ cardInfo[type] }
          alt={ `${cardInfo[name]}` }
          data-testid={ `${index}-card-img` }
        />
        <DivCardH4 data-testid={ `${index}-card-name` }>{cardInfo[name]}</DivCardH4>
      </RecipesLinks>
    </Link>
  );
}

Recipes.propTypes = {}.isRequired;
