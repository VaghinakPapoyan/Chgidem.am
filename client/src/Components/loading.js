import axios from "axios";

export async function loading(dispatch,token){
      const localtoken =  localStorage.getItem('User')
      if(localtoken){
        const data = await axios.get(`/api/getUser/${localtoken}`)
        const info = data.data
        console.log(info)
        dispatch({
          type:'changeUser',
          user:{
            username:info.username,
            email:info.email
          }
        })
    }
    return !!token
}