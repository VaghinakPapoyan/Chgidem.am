import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { loading } from "./Components/loading";
import route from "./Components/Route";
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useEffect } from "react"

function App() {
  const token = useSelector(state=>state.token)
  const user = useSelector(state=>state.user)
  const dark = useSelector(state=>state.darkMode)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(token !== null){
      loading(dispatch, token)
    }    
  }, [])

  useEffect(() => {
    localStorage.setItem("dark mode", dark)
  }, [dark])

  const router = route(!!user.username)
  
  const theme = 
  {
    colors: 
    dark
    ?
    {
      mainColor: "#1D263A",
      secondColor: "white",
      thirdColor: "#FFCD28",
      mainTextColor: "white",
      secondTextColor: "#1D263A",
      thirdTextColor: "#FFCD28"
    }
    :
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
    input
    {
      background-color: transparent;
    }
    ::placeholder
    {
      color: ${theme.colors.mainTextColor};
    }
  `
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <BrowserRouter>
        {router}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
