import axios from "axios"
import { useNavigate } from "react-router-dom";


export const sendForm = e => 
{
    e.preventDefault();
    return async (form, setError, setNext) => 
    {
        try
        {
            const res = await axios.post('/api/register', {...form})
            if(res.data.ok)
            {
                setNext(true);
                setError("")
            }
            else if(res.status === 200)
            {
                setError(res.data.error)
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
   
}
export const sendLogin = e => {
    e.preventDefault()
    return async (form,setError,navigate,dispatch)=>{
        try{
            const res = await axios.post('/api/login',{...form})
            if(res.data.ok)
            {
                setError("")
                localStorage.setItem('User',res.data.token)
                dispatch({
                    type:'changeToken',
                    token:res.data.token
                })
                navigate('/')

            }else if(res.data.error){
                setError(res.data.error)
            }
        }catch(e){
            console.log(e)
        }
    }
}