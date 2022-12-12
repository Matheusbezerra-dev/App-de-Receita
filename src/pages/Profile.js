import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div>
      <Header titlePage="Profile" buttonSearch={ false } />
      <div>
        <p data-testid="profile-email">
          {storage === null ? 'Não efetuou login' : JSON.parse(storage).email}
        </p>
        <p>
          <Button
            type="button"
            data-testid="profile-done-btn"
            onClick={ handleDoneBtn }
          >
            Done Recipes
          </Button>
        </p>
        <p>
          <Button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ handleFavoriteBtn }
          >
            Favorite Recipes
          </Button>
        </p>
        <p>
          <Button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleLogoutBtn }
          >
            Logout
          </Button>
        </p>
      </div>
      <Footer />
    </div>
  );
}
