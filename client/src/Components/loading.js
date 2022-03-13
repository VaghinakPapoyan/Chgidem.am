import axios from "axios";
import { logout } from "../hooks/useUser";


export async function loading(dispatch){
      const localtoken = localStorage.getItem('User')
      if(localtoken)
      {
        const data = await axios.get(`/api/getUser/${localtoken}`)
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
            avatar: info.avatar,
            nickname: info.nickname
          }
        })
        dispatch({
          type:'changeToken',
          token:localtoken
        })
      }
}
