import { createStore } from "redux";


export const store = createStore((state={token:''},action)=>{
    switch(action.type){
        case "changeToken":
            return {...state,token:action.token}
        default:
            return state
    }
})