import styled from 'styled-components';
import { px2vw, px1vw } from '../utils/px2vw';

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
