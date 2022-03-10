import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../../styles/styles";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Input = styled.input`
    display:block;
    padding: 8px 0px;
    width:300px;
    border-radius:3px;
    font-weight: 500;
    border: none;
    outline: none !important;
    border-radius: 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondColor};
    color: ${({ theme }) => theme.colors.mainTextColor};
    font-size: 1rem;
    margin-bottom:${params=>params.mb?params.mb:'0px'};
`
const Form = styled.form`
    text-align:center;
    margin-bottom:30px;
 `
export  const TitleForm = styled.div`
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    margin-top: 50px;
    color: ${({ theme }) => theme.colors.secondColor};
    margin-bottom: 25px;
 `
 const FormsDiv = styled.div`
    margin-top:10px;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
 `
 export const ButtonForm = styled.button`
    padding:10px 15px;
    font-size: 1rem;
    border-radius: 6px;
    font-weight: 600;
    margin-top: 15px;
    background:inherit;
    border: 1px solid ${({ theme }) => theme.colors.secondColor};
    cursor:pointer;
    transition:0.3s;
    &:hover{
        background:${({ theme }) => theme.colors.secondColor};
        color:${({ theme }) => theme.colors.mainColor};
    }
 `
 const Error = styled.div`
    width:100%;
    text-align:start;
    font-size:16px;
    color:${({ theme }) => theme.colors.thirdColor};
    opacity:0.8;
    margin:10px 0px;
 `
 const Line = styled.div`
    width:100%;
    display:flex;
    align-items:center;
 `
 const InputChekc = styled.input`
    margin-left:-20px;
    margin-top:-15px;
 `
export function ChangeQuize(){
    const params = useParams()
    const questId = params.id
    const [info,setInfo] = useState({
        title:'',
        quest:'',
        ansvers:[{ansver:'',checked:true},{ansver:'',checked:false},{ansver:'',checked:false},{ansver:'',checked:false}],
        trueAnsver:1
    })
    const [ errors,setErrors] = useState()
    const navigate = useNavigate()
    
    useEffect( () => {
        async function Fetch(){
            await axios.post('/api/getOne',{questId}).then(res=>setInfo({...res.data.quest}))
        }
        Fetch()
    },[questId] )

    const HandClick = (e) =>{
        setInfo({...info,[e.target.name]:e.target.value})
    }
    
    const ChangeAnsver = (e) =>{
        let newAnsver = info.ansvers
        setInfo({...info,writed:info.writed++})
        return (i) => {
            newAnsver[i] = {ansver:e.target.value,checked:newAnsver[i].checked}
            if(newAnsver[i].checked === true){
                setInfo({...info,trueAnsver:i+1})
            }
            setInfo({...info,ansvers:newAnsver})
        }
    }

    const ChangeValue = (e)=>{
        let newAnsver = info.ansvers

        for(let i = 0;i<newAnsver.length;i++ ){
            newAnsver[i].checked = false
        }
        return (i)=>{
            newAnsver[i] = {ansver:newAnsver[i].ansver,checked:e.target.checked}
            return setInfo({...info,ansvers:newAnsver,trueAnsver : i+1})
        }
    }
    
    const UpdateForm = async () =>{
        await axios.post('/api/updateOne',{questId,...info})
        navigate('/Quizes')
    }

    const AddQuest = (e)=>{
        e.preventDefault()
        if(info.title.length<4){
            setErrors('title minimum length was 4')
        }else if(info.quest.length<4){
            setErrors('quest minimum length was 4')
        }else if(info.ansvers[0].ansver === '' || info.ansvers[1].ansver === '' || info.ansvers[2].ansver === '' || info.ansvers[3].ansver === '' ){
            setErrors('please writes oll ansvers')
        }else{
            setErrors('')
            UpdateForm()
        }
     
    }
    return(
       <Container>
                <FormsDiv>
                  <Form onSubmit={(e)=>AddQuest(e)}>
                      <Input mb='10px' placeholder='Enter quest title' value={info.title} name='title' onChange={(e)=>HandClick(e)}/>
                      <Input mb='10px' placeholder='Enter quest' value={info.quest} name='quest' onChange={(e)=>HandClick(e)}/>
                        <Line><Input mb='10px' placeholder='Enter ansver 1' value={info.ansvers[0].ansver}   onChange={(e)=>ChangeAnsver(e)(0)}/> <InputChekc defaultChecked type="radio" onClick={(e)=>ChangeValue(e)(0)} name='d' /></Line>
                        <Line>   <Input mb='10px' placeholder='Enter ansver 2'  value={info.ansvers[1].ansver}  onChange={(e)=>ChangeAnsver(e)(1)}/><InputChekc type="radio" onClick={(e)=>ChangeValue(e)(1)}  name='d'/></Line>
                      <Line><Input mb='10px' placeholder='Enter ansver 3'  value={info.ansvers[2].ansver}  onChange={(e)=>ChangeAnsver(e)(2)}/> <InputChekc type="radio" onClick={(e)=>ChangeValue(e)(2)}  name='d'/></Line>
                      <Line><Input mb='10px' placeholder='Enter ansver 4'  value={info.ansvers[3].ansver}  onChange={(e)=>ChangeAnsver(e)(3)}/> <InputChekc type="radio" onClick={(e)=>ChangeValue(e)(3)}  name='d'/></Line>
                       
                        <Error>{errors}</Error>
                      <ButtonForm>Update</ButtonForm>
                   </Form>
                </FormsDiv>
       </Container>
    )
}