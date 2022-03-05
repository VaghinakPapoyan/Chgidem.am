import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import route from "./Components/Route";

function App() {
  const dispatch = useDispatch()
  useEffect(async ()=>{
    const localtoken =  localStorage.getItem('User')
    if(localtoken){
      const data = await axios.get(`/api/getUser/${localtoken}`)
      console.log(data)
      dispatch({
        type:'changeToken',
        token:localtoken,
        user:{
          username:data.username,
          email:data.email
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
