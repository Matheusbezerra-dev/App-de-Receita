import styled from 'styled-components';

export const FooterContainer = styled.footer`
  bottom: 0;
  width: 360px; 
  height: 52px;
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(65 25 127);

`;

export const ImgMeals = styled.img`
  width: 40px;
  height: 30px;
`;

export const ImgDrinks = styled.img`
  width: 25px;
  height: 25px;
`;

export const ContainerRevenues = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  `;

export const RecipesLinks = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ContainerRecipesDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: auto;
`;

export const ButtonStar = styled.button`
  position: fixed;
  bottom: 0px;
`;

export const LabelRecipeInProgress = styled.div`
  label {
    text-decoration: line-through solid rgb(0, 0, 0);
  }
`;
