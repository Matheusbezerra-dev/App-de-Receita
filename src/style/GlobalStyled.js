import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box
  }

  html, body, :root {
    max-width: 320px;
    max-height: 640px;
    min-height: 100%;
    min-width: 100%;
  }

  body{ 
    display: flex;
    justify-content: center;
  }
`;

export default GlobalStyled;
