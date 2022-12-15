import styled from 'styled-components';
import { px2vw, px1vw } from '../utils/px2vw';

export const ContainerButtonsTop = styled.div`
  width: 300px;
  height: 80px;
  margin: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // border: 1px solid black;
`;

export const AllImage = styled.button`
  border: none;
  background-color: white;
`;

// export const ButtonAll = styled.button`
//   background-color: white;
//   border: none;
// `;

// export const ButtonMeals = styled.button`
//   background-color: white;
//   border: none;
// `;

// export const ButtonDrinks = styled.button`
//   background-color: white;
//   border: none;
// `;

export const ContainerFavorite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImgFavorite = styled.img`
  width: ${px2vw(158, 360)}; 
  height: ${px1vw(230, 640)};
  border-radius: 5px 0px 0px 5px;
`;

export const ButtonImgFavorite = styled.button`
  border: none;
  background: none;
  height: ${px1vw(230, 640)};
`;

export const DivFavoriteCard = styled.div`
  display: flex;  
  justify-content: space-around;
  width: ${px2vw(318, 360)};
  height: ${px1vw(230, 640)};
  border-radius: 5px;
  margin-top: 20px;
  border: 1px solid gray;
`;

export const AllButtonsBySideRecipeImg = styled.div`
  width: ${px2vw(158, 360)};
  height: ${px1vw(230, 640)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 2px solid red;
`;

export const NameCategoryFavorite = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // border: 3px solid green;
`;

export const ButtonNameFavorite = styled.button`
  width: 86px;
  height: 15px;
  background-color: white;
  display: flex;
  margin-left: none;
  border: none;
`;

export const NameFavorite = styled.p`
  font-weight: bold;
  font-size: 15px;
  font-family: Epilogue;
  width: 200px;
  // border: 1px solid blue;
`;

export const CategoryRecipeCard = styled.p`
  display: flex;
  font-size: 12px;
  font-family: Epilogue;
  margin-left: 10%;
  margin-top: 10px;
  width: 200px;
  // border: 1px solid red;
`;

export const ButtonShareAndFavorite = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  // justify-content: space-around;
  // aling-items: center;
  margin-top: 18px;
  // border: 2px solid purple;
`;

export const ButtonShare = styled.button`
  background-color: white;
  border: none;
  margin-left: 10%;
  // border: 1px solid red;
  // color: #FCC436;
`;

// export const ImageShare = styled.img`
//   color: #FCC436;
// `;

export const ButtonFavorite = styled.button`
  border: none;
  background-color: white;
  margin-left: 15%;
  // color: #FCC436;
`;

export const ImgFavoriteBySideShare = styled.img`
  background-color: white;
  // border: 1px solid black;
  // color: #FCC436;
`;
