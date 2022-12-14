import React from 'react';
import { Link } from 'react-router-dom';

import {
  ImgCard,
  ContainerRecipes,
  LinkH4,
} from './RecipesStyle';

export default function Recipes(props) {
  const { cardInfo, type, name, index, idRoute, title } = props;

  return (

    <Link to={ `/${title}/${cardInfo[idRoute]}` }>
      <ContainerRecipes data-testid={ `${index}-recipe-card` }>
        <ImgCard
          src={ cardInfo[type] }
          alt={ `${cardInfo[name]}` }
          data-testid={ `${index}-card-img` }
        />
        <LinkH4 data-testid={ `${index}-card-name` }>{cardInfo[name]}</LinkH4>
      </ContainerRecipes>
    </Link>
  );
}

Recipes.propTypes = {}.isRequired;
