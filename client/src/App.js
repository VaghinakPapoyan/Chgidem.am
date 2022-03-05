import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import route from "./Components/Route";

function App() {
  const dispatch = useDispatch()
  useEffect(async ()=>{
    const localtoken = await localStorage.getItem('User')
    if(localtoken){
      const data = await axios.get(`/api/getUser/${localtoken}`)
      const result = JSON.parse(data)
      console.log(result)
      dispatch({
        type:'changeToken',
        token:localtoken,
        user:{
          username:result.username,
          email:result.email
        }
      })
    }
   
  },[])
  console.log('s')
  const token = useSelector(state=>state.token)
  const router = route(!!token)
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
