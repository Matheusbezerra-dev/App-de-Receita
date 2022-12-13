import styled from 'styled-components';
import { px2vw, px1vw } from '../utils/px2vw';
// const naoesquece360 = 10,5;
// const naoesquece640 = 4,90;
const NUMBER_32 = 32;
const NUMBER_55 = 55;

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${px2vw(360, 360)};
  height: ${px1vw(640, 640)};
  background-color: rgb(65, 25, 127);
`;

export const ImgLogo = styled.img`
  width: ${px2vw(195, 360)};
  margin-top: ${px1vw(200, 640)};
`;

export const ImgTomate = styled.img`
  width: ${px2vw(350, 360)};
`;

export const ContainerInputLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${px2vw(2898)};
  margin-top: ${px1vw(70, 640)};
`;
export const H1Login = styled.h1`
  font-family: Epilogue;
  color: rgb(65, 25, 127);
  font-size: ${px2vw(24, 320)};
  font-weight: 500;
  font-style: italic;
`;

export const ContainerInpunt = styled.div`
  width: ${px2vw(276, 360)};
  gap: ${px1vw(10, 640)};
  display: flex;
  flex-direction: column;
`;

export const Inputs = styled.input`
  margin-top: 9px;
  height: ${px1vw(40, 360)};
  border-radius: ${px2vw(5, 360)};
  border: 1px solid rgb(65, 25, 127);
  ::placeholder{
    padding: 10px;
    display: flex;
    padding-top: 10px;
    color: rgb(65, 25, 127);    
    font-size: ${px2vw(14, 360)};
  }
`;

export const Button = styled.button`
  display: flex;
  margin-top: 9px;
  justify-content: center;
  align-items: center;
  height: ${px1vw(40, 360)};
  border-radius: ${px2vw(53)};
  background-color: rgb(252, 196, 54);
  font-size: ${px2vw(147)};
  color: rgb(255, 255, 255);
  font-family: Epilogue;
  font-weight: bold;
  margin-bottom: ${px1vw(60, 640)};
`;
