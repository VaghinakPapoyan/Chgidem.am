import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { AuthHome } from "./Pages/Auth/AuthHome";
import CreateQuiz from "./Pages/Create Quiz/CreateQuiz";
import Questions from "./Pages/Create Quiz/Questions";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Form from "./Pages/Form/Form";
import { Home } from "./Pages/noAuth/Home";


export default function route(isAuth){
    if(!isAuth){
        return(
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path="/account/registration" element={<Form />}/>
                <Route path="/account/log-in" element={<Form login />}/>
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path="/" element={<AuthHome setState/>}/>
            <Route path="/create-quiz" element={<CreateQuiz />}/>
            <Route path="/questions" element={<Questions />}/>
            <Route path="/edit-profile" element={<EditProfile />}/>
        </Routes>
    )
}