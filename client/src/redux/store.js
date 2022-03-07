import { createStore } from "redux";


export const store = createStore((state={token:'',quests:[],user:{
    username:'',
    email:''
}},action)=>{
    switch(action.type){
        case "changeToken":
            localStorage.setItem('User',action.token)
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
           
            return {...state,quests:state.quests.filter(quest=>state.quests.findIndex(i=>i==quest)!==action.id)}
        default:
            return state
      
    }
})