import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../hooks/useUser";


export async function loading(dispatch,token){
      const localtoken = localStorage.getItem('User')
      if(localtoken)
      {
        const data = await axios.get(`/api/getUser/${localtoken}`)
        if(data?.data?.error?.message === "jwt expired")
        {
          logout();
        }
        const info = data.data
        GetTests(dispatch)
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
    return !!token
}

export async function GetTests(dispatch){
  const localtoken = localStorage.getItem('User')
  const MyTests = await axios.post('api/get/myTests',{localtoken})
  dispatch({
    type:'putTests',
    tests:MyTests.data
  })
}