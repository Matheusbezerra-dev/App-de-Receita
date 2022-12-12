import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RevenueCard(props) {
  const { cardInfo, type, name, index, id } = props;
  const history = useHistory();

  function selectedRevenue() {
    if (history.location.pathname.includes('meals')) {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/meals/${id}`);
    }
  }

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{cardInfo[name]}</h4>
      <img
        data-testid={ `${index}-card-img` }
        src={ cardInfo[type] }
        alt={ name }
        id={ id }
        aria-hidden="true"
        onClick={ () => selectedRevenue() }
      />
    </div>
  );
}

RevenueCard.propTypes = {}.isRequired;
