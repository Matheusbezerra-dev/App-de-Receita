import React from 'react';
import { useHistory } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoriteProfile from '../images/FavoriteRecipes.png';
import DoneProfile from '../images/DoneRecipes.png';
import Logout from '../images/Logout.png';
import {
  ButtonProfile,
  AllItemsProfile,
  ItemsDoneFavLogout,
  ButtonDone,
  ButtonFavorite,
  ButtonLogout,
  Email,
  EmailText,
} from './ProfileStyle';

export default function Profile() {
  const storage = localStorage.getItem('user');
  const history = useHistory();
  const handleDoneBtn = () => {
    history.push('/done-recipes');
  };
  const handleFavoriteBtn = () => {
    history.push('/favorite-recipes');
  };
  const handleLogoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <AllItemsProfile>
      <Header titlePage="Profile" buttonSearch={ false } />
      <ItemsDoneFavLogout>
        <Email>
          <EmailText data-testid="profile-email">
            {storage === null ? 'Não efetuou login' : JSON.parse(storage).email}
          </EmailText>
        </Email>
        <ButtonDone>
          <ButtonProfile
            type="button"
            data-testid="profile-done-btn"
            onClick={ handleDoneBtn }
          >
            <img src={ DoneProfile } alt="done logo" />
          </ButtonProfile>
        </ButtonDone>
        <ButtonFavorite>
          <ButtonProfile
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ handleFavoriteBtn }
          >
            <img src={ FavoriteProfile } alt="favorite logo" />
          </ButtonProfile>
        </ButtonFavorite>
        <ButtonLogout>
          <ButtonProfile
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleLogoutBtn }
          >
            <img src={ Logout } alt="logout logo" />
          </ButtonProfile>
        </ButtonLogout>
      </ItemsDoneFavLogout>
      <Footer />
    </AllItemsProfile>
  );
}
