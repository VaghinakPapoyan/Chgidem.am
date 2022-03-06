import axios from "axios"

export const createTest = async (e,info,navigate,setError)=>{
    e.preventDefault()
    const data = await axios.post('/api/add/test',{...info})
    if(data.data.error){
        setError(data.data.error)
    }
    setError('')
    navigate('/create-quiz/questions')
}