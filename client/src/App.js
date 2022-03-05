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
      const info = data.data
      console.log(info)
      dispatch({
        type:'changeUser',
        user:{
          username:info.username,
          email:info.email
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
