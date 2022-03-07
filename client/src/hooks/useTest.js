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

export const questAdd = (e) => {
    e.preventDefault()
   return async (info,setInfo,setErrors) =>{
    const data = await axios.post('/api/add/quest',{...info})
    if(data.data.error){
        setErrors(data.data.error)
    }else{
        setErrors('Your quest created')
        setInfo({
            title:'',
            quest:'',
            ansvers:[{ansver:''},{ansver:''},{ansver:''}],
            trueAnsver:''
        })
    }
   }

}