import React from 'react';
import { Link } from 'react-router-dom';

export default function Recipes(props) {
  const { cardInfo, type, name, index, idRoute, title } = props;

  return (
    <Link to={ `/${title}/${cardInfo[idRoute]}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <h4 data-testid={ `${index}-card-name` }>{cardInfo[name]}</h4>
        <img
          src={ cardInfo[type] }
          alt={ `${name}` }
          data-testid={ `${index}-card-img` }
        />

      </div>
    </Link>
  );
}

Recipes.propTypes = {}.isRequired;
