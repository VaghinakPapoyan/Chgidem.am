import axios from "axios";


export async function loading(dispatch,token){
      const localtoken = localStorage.getItem('User')
      if(localtoken){
        const data = await axios.get(`/api/getUser/${localtoken}`)
        console.log(data?.data?.error?.message, data);
        if(data?.data?.error?.message === "jwt expired")
        {
          localStorage.removeItem('User')
          localStorage.removeItem('token')
        }
        const info = data.data
        dispatch({
          type:'changeUser',
          user:{
            username:info.username,
            email:info.email
          }
        })
    }
    console.log(!!localtoken);
    return !!localtoken
}