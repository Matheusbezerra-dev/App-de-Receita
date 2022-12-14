import styled from 'styled-components';
import { px2vw, px1vw } from '../utils/px2vw';

export const ContainerRecipes = styled.div`
  width: ${px2vw(157, 360)};
  border: 1px solid rgb(177, 177, 177);
  border-radius: 5px;
`;

export const ImgCard = styled.img`
  width: ${px2vw(157, 360)};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const LinkH4 = styled.h4`
  padding: 4px;
  text-transform: none;
  text-decoration: none;
  color: black;
`;
