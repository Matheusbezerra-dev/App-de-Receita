import styled from 'styled-components';
import { px2vw, px1vw } from '../utils/px2vw';

export const ContainerFooter = styled.footer`
  bottom: 0;
  width: ${px2vw(360, 360)}; 
  height: ${px1vw(90, 640)};
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