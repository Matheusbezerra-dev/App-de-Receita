import React from 'react';
import { Link } from 'react-router-dom';
import { FooterContainer, ImgDrinks, ImgMeals } from '../style/styled';
import drinksIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <FooterContainer data-testid="footer">
      <Link to="/drinks">
        <ImgDrinks
          data-testid="drinks-bottom-btn"
          src={ drinksIcon }
          alt="drinks icons"
        />
      </Link>
      <Link to="/meals">
        <ImgMeals
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="meal icons"
        />
      </Link>
    </FooterContainer>
  );
}
