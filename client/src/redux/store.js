import { createStore } from "redux";

const changeTheme = "changeTheme";

export const store = createStore((state={token:'',MyTest:[], darkMode: !!localStorage.getItem("dark mode") || false,quests:[],user:{
    username: "",
    email: "",
    avatar: "",
    nickname: ""
}},action)=>{
    switch(action.type){
        case "changeToken":
            if(action.token){
                localStorage.setItem('User',action.token)
            }else{
                localStorage.removeItem('User')
            }
            return {...state,token:action.token}
        case "changeUser":
            return {...state,user:action.user}
        case "addquest":
            let newQuest = state.quests
            newQuest.push(action.quest)
            return {...state,quests:newQuest}
        case "refreshQuest":
            return {...state,quests:[]}
        case "deletequest":
            return {...state,quests:state.quests.filter(quest=>state.quests.findIndex(i=>i===quest)!==action.id)}
        case changeTheme:
            localStorage.setItem("dark mode", !state.darkMode)
            return {...state, darkMode: !state.darkMode}
        case "putTests":
            return {...state,MyTest:action.tests}
        default:
            return state
      
    }
})

export const changeThemeAction = payload => ({ type: changeTheme, payload })