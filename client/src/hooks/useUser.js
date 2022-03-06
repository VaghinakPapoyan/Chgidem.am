import axios from "axios"
import { useNavigate } from "react-router-dom";


export const sendForm = e => 
{
    e.preventDefault();
    return async (form, setError, setNext) => 
    {
        try
        {
            const res = await axios.post('/api/dataCheck', {...form})
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

export const registration = e => 
{
    e.preventDefault();
    return async (code, setError,dispatch,navigate) => 
    {
        try
        {
            const res = await axios.post('/api/registration', {code})
            console.log(res);
            if(res.data.ok)
            {
                console.log("sad");
                dispatch({
                    type:'changeToken',
                    token:res.data.token
                })
                navigate('/')
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

export const logout = setState => 
{
    localStorage.removeItem("User")
    setState(state => !state)
}