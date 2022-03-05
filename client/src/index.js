import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import "reset-css"

const theme = 
{
  colors: 
  {
    mainColor: "white",
    secondColor: "#1D263A",
    thirdColor: "#FFCD28",
    mainTextColor: "#1D263A",
    secondTextColor: "white",
    thirdTextColor: "#FFCD28"
  }
}

const GlobalStyle = createGlobalStyle`
  *
  {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif !important;
  }
  body
  {
    background-color: ${theme.colors.mainColor};
  }
  ::selection 
  {
    color: ${theme.colors.secondTextColor};
    background: ${theme.colors.secondColor};
  } 
`

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

