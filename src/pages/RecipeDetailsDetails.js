import styled from 'styled-components';
import { px2vw, px1vw } from '../utils/px2vw';

export const ContainerRecipesDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: auto;
  margin-top: 60px;
`;

export const ImgRecipesDetails = styled.img`
  top: 0;
  background-color: rgba(0, 0, 0, 1);
  width: ${px2vw(360, 360)};
  height: ${px1vw(300, 640)};
  object-fit: cover;
`;

export const DivOpacidade = styled.div`
  position: absolute;
  top: 0;
  width: ${px2vw(360, 360)};
  height: ${px1vw(300, 640)};
  background-color: rgba(0, 0, 0, 35%);
  z-index: 0;
`;

export const ContainerRecipes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
`;

export const ContainerCategoryRecipes = styled.div`
  display: flex;
  margin-top: 10px;
  width: ${px2vw(360, 360)};
  justify-content: space-around;
  align-items: center;
`;

export const ButtonRecipesDetails = styled.button`
  position: fixed;
  width: 336px;
  height: 40px;
  background-color: rgb(252, 220, 54);
  border: 1px solid rgb(252, 220, 54);
  border-radius: 5px;
  color: rgb(255, 255, 255);
  box-shadow: 1px 1px 5px black;
  bottom: 0px;
`;

export const ContainerButtonShared = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ContainerIngredients = styled.div`
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 335px;
`;

export const ContainerUl = styled.ul`
  border: 1px solid rgb(177, 177, 177);
  width: 335px;
  border-radius: 5px;
`;

export const TitleH2 = styled.h2`
  margin-left: 10px;
`;

export const ContainerP = styled.div`
  border: 1px solid rgb(177, 177, 177);
  width: 335px;
  border-radius: 5px;
  padding: 10px;
`;

export const IframeContainer = styled.iframe`
  margin-bottom: 20px;
`;

export const ContainerCarousel = styled.div`
  margin-bottom: 50px;
`;

export const ButtonShared = styled.button`
  background: none;
  border: none;
`;

export const TextSpan = styled.span`
  color: rgb(255, 255, 255);
`;

export const Titleh3P = styled.h3`
  color: rgb(255, 255, 255);
  margin-top: 20px;
`;

export const ContainerLabel = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(177, 177, 177);
  width: 335px;
  border-radius: 5px;
  padding: 10px;
`;

export const Label = styled.label`

`;

export const ContainerIngredientsProgress = styled.div`
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 335px;
  margin-bottom: 65px;
`;
