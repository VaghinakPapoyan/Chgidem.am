import axios from "axios"

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
   navigate('#')
}
