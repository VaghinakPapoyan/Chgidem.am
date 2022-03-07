import axios from "axios";
import { logout } from "../hooks/useUser";


export async function loading(dispatch,token){
      const localtoken = localStorage.getItem('User')
      if(token){
        const data = await axios.get(`/api/getUser/${token}`)
        if(data?.data?.error?.message === "jwt expired")
        {
          logout();
        }
        const info = data.data
        dispatch({
          type:'changeUser',
          user:{
            username: info.username,
            email: info.email,
            nickname: info.nickname
          }
        })
    }
    return !!token
}