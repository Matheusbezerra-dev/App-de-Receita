import React from 'react';
import { Link } from 'react-router-dom';
import {
  ContainerFooter,
  ImgMeals,
  ImgDrinks,
} from './FooterStyle';
import drinksIcon from '../images/icone-bebida.png';
import mealIcon from '../images/icone-prato.png';

export default function Footer() {
  return (
    <ContainerFooter data-testid="footer">
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
    </ContainerFooter>
  );
}
