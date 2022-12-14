import styled from 'styled-components';
import { px1vw } from '../utils/px2vw';

export const ButtonProfile = styled.button`
  border: none;
  background: none;
  height: ${px1vw(230, 640)};
`;

export const AllItemsProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ItemsDoneFavLogout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonDone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
`;

export const ButtonFavorite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid gray;
  height: 100px;
`;

export const ButtonLogout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid gray;
  height: 100px;
`;

export const Email = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EmailText = styled.p`
  font-weight: bold;
`;
