import styled from 'styled-components';
import { px2vw, px1vw} from '../utils/px2vw';

export const ContainerRecipesDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: auto;
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
  position: absolute;
  top: 0;
`;

export const ButtonRecipesDetails = styled.button`
  position: fixed;
  bottom: 0px;
`;
