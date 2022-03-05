import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { AuthHome } from "./Pages/Auth/AuthHome";
import { Home } from "./Pages/noAuth/Home";


export default function route(isAuth){
    if(!isAuth){
        return(
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path="/" element={<AuthHome/>}/>
        </Routes>
    )
}