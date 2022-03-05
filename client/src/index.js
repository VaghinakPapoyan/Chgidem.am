import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import "reset-css"

const GlobalStyle = createGlobalStyle`
  *
  {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif !important;
  }
`

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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

