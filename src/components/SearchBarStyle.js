import styled from 'styled-components';
import { px1vw, px2vw } from '../utils/px2vw';

export const ContainerSearchBar = styled.div`
  display: flex;
  flex-direction: column;
  width: ${px2vw(207, 360)};
  height: ${px1vw(188, 640)};
`;

export const ContainerLabel = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  width: ${px2vw(207, 360)};
`;

export const LabelInput = styled.label`
  display: flex;
  gap: 3px;
  align-items: center;
  font-size: 11px;
  color: rgb(255, 255, 255);
`;

export const ButtonSearch = styled.button`
  background-color: rgb(252, 220, 54);
  color: rgb(255, 255, 255);
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid rgb(252, 220, 54);
  box-shadow: 1px 1px 5px black;
`;
