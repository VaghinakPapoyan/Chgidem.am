import { createStore } from "redux";


export const store = createStore((state={token:'',user:{
    name:'',
    email:''
}},action)=>{
    switch(action.type){
        case "changeToken":
            localStorage.setItem('User',action.token)
            return {...state,token:action.token}
        default:
            return state
    }
})