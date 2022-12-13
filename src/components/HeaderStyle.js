import styled from 'styled-components';
import { px1vw, px2vw } from '../utils/px2vw';

export const ContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${px2vw(360, 360)};
`;

export const ContainerLogos = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: ${px1vw(90, 640)};
  width: ${px2vw(360, 360)};
  background-color: rgb(252, 220, 54);
`;

export const ContainerImg = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: ${px2vw(167, 360)};
`;

export const ContainerIcons = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${px2vw(72, 360)};
`;

export const ButtonSearch = styled.button`
  border: 0;
  background-color: #FCDC36;
`;

export const ButtonCategory = styled.button`
  border-color: red;
`;

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  height: ${px1vw(180, 640)};
`;

export const TitleH1 = styled.h1`
  margin-top: ${px1vw(20, 640)};
  font-size: ${px2vw(20, 320)};
  color: rgb(65, 25, 127);
  font-weight: 900;
  font-family: Epilogue;
`;

export const ContainerSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: ${px2vw(340, 360)};
  height: ${px1vw(188, 640)};
  background-color: rgb(65, 25, 127);
  box-shadow: 1px 1px 5px black;
  margin-bottom: 20px;
  border-radius: 5px;
`;

export const LabelSearch = styled.label`
  width: ${px2vw(320, 360)};
  input {
    min-width: 100%;
    border: 1px solid white;
    box-shadow: 1px 1px 10px black;
    border-radius: 5px;    
  }
`;
