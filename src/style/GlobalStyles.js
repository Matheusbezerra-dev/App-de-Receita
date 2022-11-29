import { createGlobalStyle } from 'styled-components';

const GloblaStyled = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box
  }

  html, body, :root {
    min-width: 100%;
  }

  body{ 
    display: flex;
    justify-content: center;
  }
`;

export default GloblaStyled;
