import styled from 'styled-components';
import { px2vw, px1vw } from '../utils/px2vw';

export const ContainerButtonsTop = styled.div`
  width: 200px;
  height: 50px;
  margin: 20px;
  display: flex;
  justify-content: space-around;
  aling-items: center;
  border: 1px solid black;
`;

export const ContainerFavorite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImgFavorite = styled.img`
  width: ${px2vw(158, 360)};
  height: ${px1vw(230, 640)};
`;

export const DivFavoriteCard = styled.div`
  display: flex;  
  width: ${px2vw(318, 360)};
  height: 135px;
  border-radius: 5px;
`;

export const AllButtonsBySideRecipeImg = styled.div`
  width: ${px2vw(158, 360)};
  height: ${px1vw(230, 640)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  aling-items: center;
  border: 2px solid red;
`;

export const NameCategoryFavorite = styled.div`
  display: flex;
  justify-content: center;
  aling-items: center;
  flex-direction: column;
  border: 3px solid green;
`;

export const ButtonNameFavorite = styled.button`
  width: 86px;
  height: 15px;
  background-color: white;
  display: flex;
  justify-content: center;
  aling-items: center;
  margin-left: 18%;
  border: none;
`;

export const NameFavorite = styled.p`
  // width: 86px;
  // height: 12px;
  // border: 1px solid red;
`;

export const CategoryRecipeCard = styled.p`
  display: flex;
  justify-content: center;
  // margin: 5px, 8px; 
`;

export const ButtonShareAndFavorite = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  aling-items: center;
  margin-top: 18px;
  border: 2px solid purple;
`;

export const ButtonShare = styled.button`
  background-color: white;
  border: none;
  color: #FCC436;
`;

export const ImageShare = styled.img`
  // background-color: #FCC436;
`;
