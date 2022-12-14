import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import BodyRecipes from '../pages/BodyRecipes';

const ContainerDrinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Drinks() {
  return (
    <ContainerDrinks>
      <Header titlePage="Drinks" buttonSearch />
      <BodyRecipes title="Drinks" />
      <Footer />
    </ContainerDrinks>
  );
}
