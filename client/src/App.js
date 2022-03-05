import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { loading } from "./Components/loading";
import route from "./Components/Route";

function App() {
  const token = useSelector(state=>state.token)
  const dispatch = useDispatch()
  const bool = loading(dispatch,token)
  const router = route(bool)
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
