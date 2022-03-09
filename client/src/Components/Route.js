import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { AuthHome } from "./Pages/Auth/AuthHome";
import CreateQuiz from "./Pages/Create Quiz/CreateQuiz";
import Questions from "./Pages/Create Quiz/Questions";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Form from "./Pages/Form/Form";
import Global from "./Pages/GlobalTests/Global";
import { Home } from "./Pages/noAuth/Home";
import AddQuize from "./Pages/Tests/AddQuize";
import { ChangeQuize } from "./Pages/Tests/ChangeQuize";
import TestSee from "./Pages/Tests/TestSee";


export default function route(isAuth){
    if(!isAuth){
        return(
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path="/account/registration" element={<Form />}/>
                <Route path="/account/log-in" element={<Form login />}/>
                <Route path="/account/forget-password" element={<Form login changePassword />}/>
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path="/" element={<AuthHome setState/>}/>
            <Route path="/create-quiz" element={<CreateQuiz />}/>
            <Route path="/questions" element={<Questions />}/>
            <Route path="/edit-profile" element={<EditProfile />}/>
            <Route path="/Tests" element={<Global />}/>
            <Route path="/Quizes" element={<TestSee />}/>
            <Route path="/AddQuize/:id" element={<AddQuize />}/>
            <Route path="/Quizes/change/:id" element={<ChangeQuize />}/>
        </Routes>
    )
}