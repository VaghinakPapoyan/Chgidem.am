import axios from "axios"
import { GetTests } from "../Components/loading"

export const createTest = (e)=>{
    e.preventDefault()
    return async (info,navigate,setError)=>{
        const token = localStorage.getItem("User")
        const data = await axios.post('/api/add/test',{...info,token})
        if(data.data.error){
            setError(data.data.error)
        }else{
            console.log('a')
            setError('')
            navigate('/questions')
        }
    }
}


export const questAdd =  async(quests,dispatch,navigate) => {
    await axios.post('/api/add/quest',{quests})
    dispatch({
        type:'refreshQuest'
    })
    GetTests(dispatch)
   navigate('/quizes')
}


export  const GetQuests = async (testId) =>{
    const quests = await axios.post('/api/getQuest',{testId})
    console.log(testId)
    return quests
}