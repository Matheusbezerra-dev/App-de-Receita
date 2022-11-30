import React from 'react';
import { act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Profile from '../components/Profile';
// import App from '../App';
import Profile from '../components/Profile';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Profile', () => {
  test('Testa se a pessoa é redirecionada para "/profile"', () => {
    const { history } = renderWithRouter(<Profile />);
    act(() => { history.push('/profile'); });
    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
