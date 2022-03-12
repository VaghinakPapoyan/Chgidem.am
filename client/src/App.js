import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { loading } from "./Components/loading";
import route from "./Components/Route";
import { useEffect } from "react"

function App() {
  const token = useSelector(state=>state.token)
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if(token !== null){
      loading(dispatch, token)
    }    
  }, [])
  const router = route(!!user.username)
  
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
