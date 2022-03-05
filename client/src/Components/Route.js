import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { AuthHome } from "./Pages/Auth/AuthHome";
import Form from "./Pages/Form/Form";
import { Home } from "./Pages/noAuth/Home";


export default function route(isAuth){
    if(isAuth){
        return(
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path="/" element={<AuthHome/>}/>
            <Route path="/account/registration" element={<Form />}/>
            <Route path="/account/log-in" element={<Form login />}/>
        </Routes>
    )
}