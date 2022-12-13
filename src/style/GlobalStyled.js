import { createGlobalStyle } from 'styled-components';
import { px2vw } from '../utils/px2vw';

const NUMBER_MAGIC = 13;
const NUMBER_MAGIC1 = 18;
const NUMBER_MAGIC2 = 16;

const GlobalStyled = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: ${px2vw(NUMBER_MAGIC, 320)};

    @media (min-width: 768px) {
      font-size: ${px2vw(NUMBER_MAGIC1, 768)};
    }

    @media (min-width: 1024px) {
      font-size: ${px2vw(NUMBER_MAGIC2, 1024)};
    }
  }
`;

export default GlobalStyled;
