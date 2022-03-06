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
  const isComponentMounted = useRef(true);
  useEffect(() => 
  {
    if (isComponentMounted.current) 
    {
      (async () => {
        try 
        {
          loading(dispatch,token).then(res => setBool(res))
        } 
        catch (err) 
        {
          console.log(err);
        } 
      })();
    }
    
    return () => {
      isComponentMounted.current = false;
    };
  }, [])
  
  const router = route(bool)
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
