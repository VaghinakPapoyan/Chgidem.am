import axios from "axios"

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