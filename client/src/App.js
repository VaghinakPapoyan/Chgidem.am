import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { loading } from "./Components/loading";
import route from "./Components/Route";
import { useEffect, useState, useRef } from "react"

function App() {
  const token = useSelector(state=>state.token)
  const dispatch = useDispatch()
  console.log(token)
  let [bool, setBool] = useState(false);
  loading(dispatch,token).then(res=>{setBool(res)})
  const router = route(bool)
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
