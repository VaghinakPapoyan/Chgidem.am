import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import route from "./Components/Route";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const localtoken = localStorage.getItem('User')
    if(localtoken){
      dispatch({
        type:'changeToken',
        token:localtoken
      })
    }
   
  },[])
  const token = useSelector(state=>state.token)
  const router = route(!!token)
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
