import React/* , { useContext } */ from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
// import AppContext from '../context/AppContext';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header titlePage="Profile" buttonSearch={ false } />
      <div>
        <p data-testid="profile-email">{email}</p>
        <p><Button type="button" data-testid="profile-done-btn">Done Recipes</Button></p>
        <p>
          <Button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Button>
        </p>
        <p><Button type="button" data-testid="profile-logout-btn">Logout</Button></p>
      </div>
      <Footer />
    </div>
  );
}
