import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Drinks', () => {
  test('Testa se a pessoa é redirecionada para "/drinks"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/drinks'); });
    expect(history.location.pathname).toBe('/drinks');

    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });
});
