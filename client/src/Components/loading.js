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
        GetTests(dispatch)
      }
}

export async function GetTests(dispatch){
  const localtoken = localStorage.getItem('User')
  const MyTests = await axios.post('api/get/myTests',{localtoken})
  dispatch({
    type:'putTests',
    tests:MyTests.data
  })
}