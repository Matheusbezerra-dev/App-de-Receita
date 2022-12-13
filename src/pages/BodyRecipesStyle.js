import styled from 'styled-components';
import { px2vw, px1vw } from '../utils/px2vw';

const MAX_WIDTH = 360;
const MIN_WIDTH = 335;
const MAX_HEIGHT = 640;
const MIN_HEIGHT = 69;

export const ContainerButtonCategory = styled.div`
  display: flex;
  flex-direction: row;
  width: ${px2vw(MIN_WIDTH, MAX_WIDTH)};
  height: ${px1vw(MIN_HEIGHT, MAX_HEIGHT)};
  gap: 10px;
`;

export const ButtonCategory = styled.button`
  border: 0;
  background-color: white;
`;

export const RecipesDetailsI = styled.div`

`;
