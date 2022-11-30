import React from 'react';
import { act, screen } from '@testing-library/react';
import Drinks from '../components/Drinks';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Drinks', () => {
  test('Testa se a pessoa é redirecionada para "/drinks"', () => {
    const { history } = renderWithRouter(<Drinks />);
    act(() => { history.push('/drinks'); });
    expect(history.location.pathname).toBe('/drinks');
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });
});
