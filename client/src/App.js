import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { loading } from "./Components/loading";
import route from "./Components/Route";
import { useEffect, useState, useRef } from "react"

function App() {
  const token = useSelector(state=>state.token)
  const dispatch = useDispatch()
  let [bool, setBool] = useState(false);
  useEffect(()=>{
    loading(dispatch,token).then(res=>{setBool(res)})
  },[token])
  const router = route(bool)
  console.log(bool)
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
