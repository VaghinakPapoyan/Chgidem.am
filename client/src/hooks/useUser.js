import axios from "axios"

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

export const logout = (dispatch,navigate) => 
{
    localStorage.removeItem("User")
    dispatch({
        type:'changeToken',
        token:undefined
    })
    dispatch({
        type:'changeUser',
        user:{
            username:'',
            email:''
        }
    })
    navigate('/')
}

export const updateData = e => 
{
    e.preventDefault();
    return async (form, setError, setMessage, setLoading) => 
    {
        try
        {
            setLoading(true)
            const res = await axios.put('/api/change-user-data', {...form})
            if(res.data.ok)
            {
                setError(null)
                setMessage(res.data.message)
            }
            else if(res.status === 200)
            {
                setMessage(null)
                setError(res.data.error)
            }
            setLoading(false)
        }
        catch(err)
        {
            console.log(err);
        }
    }
   
}

export const ChangeImg =  e => 
{
    return async (setMessage, setLoading) => 
    {
        try
        {
            setLoading(true);
            const data = new FormData();
            data.append("avatar", e.target.files[0])
            data.append("token", localStorage.getItem("User"))
            const res = await axios.post("/api/change-user-image", data, {headers: { "content-type": "mulpipart/form-data" }})
            setLoading(false);
            setMessage(res.data.message)
        }
        catch(e)
        {
            console.log(e);
        }
    }
}

export const changePassword = e => 
{
    return async (email, setNext, setError) => 
    {
        try
        {
            const res = await axios.post('/api/forget-password', {email})
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