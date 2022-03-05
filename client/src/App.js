import { BrowserRouter } from "react-router-dom";
import route from "./Components/Route";

function App() {
  const router = route(false)
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
    );
}

export default App;
