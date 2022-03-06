import axios from "axios";

export const loading =  (dispatch,token)=>{
      const localtoken =   localStorage.getItem('User')
      if(!localtoken){
       
        return false
    }
    async()=>{
      const data = await axios.get(`/api/getUser/${localtoken}`)
      const info = data.data
      console.log(data)
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