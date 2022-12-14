import styled from 'styled-components';
import Footer from './Footer';
import BodyRecipes from '../pages/BodyRecipes';
import Header from './Header';

const ContainerMeals = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default function Meals() {
  return (
    <ContainerMeals>
      <Header titlePage="Meals" buttonSearch />
      <BodyRecipes title="Meals" />
      <Footer />
    </ContainerMeals>
  );
}
