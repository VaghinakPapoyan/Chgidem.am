import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import {  questAdd } from '../../../hooks/useTest'
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'


const Input = styled.input`
    display:block;
    padding:8px 15px;
    width:300px;
    border-radius:3px;
    border:1px solid ${({ theme }) => theme.colors.secondColor};
    color: ${({ theme }) => theme.colors.mainTextColor};
    font-size:18px;
    margin-bottom:${params=>params.mb?params.mb:'0px'};
`
const Form = styled.form`
    text-align:center;
 `
 const TitleForm = styled.div`
    text-align:start;
    width:100%;
    font-size:20px;
    color:d ${({ theme }) => theme.colors.secondColor};
    margin-bottom:10px;
 `
 const FormsDiv = styled.div`
    margin-top:10px;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
 `
 const ButtonForm = styled.button`
    padding:10px 15px;
    font-size:14px;
    border-radius:3px;
    background:inherit;
    border:1px solid ${({ theme }) => theme.colors.secondColor};
    cursor:pointer;
    transition:0.3s;
    &:hover{
        background:${({ theme }) => theme.colors.secondColor};
        color:${({ theme }) => theme.colors.mainColor};
    }
 `
export default function Questions() {
    const [info,setInfo] = useState({
        title:'',
        quest:'',
        ansvers:[{ansver:''},{ansver:''},{ansver:''}],
        trueAnsver:''
    })
    const [error,setErrors] = useState('')
    const HandClick = (e) =>{
        setInfo({...info,[e.target.name]:e.target.value})
    }
    const ChangeAnsver = (e) =>{
        let newAnsver = info.ansvers
        return (i) => {
            newAnsver[i] = {ansver:e.target.value}
            setInfo({...info,ansvers:newAnsver})
        }
    }
    console.log(info.ansvers)
    return (
            <Container>
                <Header page="create-quiz" auth />
                <FormsDiv>
                  <Form onSubmit={(e)=>questAdd(e)(info,setInfo, setErrors)}>
                      <TitleForm>Create Test</TitleForm>
                      <Input mb='10px' placeholder='Enter quest title' value={info.title} name='title' onChange={(e)=>HandClick(e)}/>
                      <Input mb='10px' placeholder='Enter quest ' value={info.quest} name='quest' onChange={(e)=>HandClick(e)}/>
                      <Input mb='10px' placeholder='Enter ansver 1' value={info.ansvers[0].ansver}   onChange={(e)=>ChangeAnsver(e)(0)}/>
                      <Input mb='10px' placeholder='Enter ansver 2'  value={info.ansvers[1].ansver}  onChange={(e)=>ChangeAnsver(e)(1)}/>
                      <Input mb='10px' placeholder='Enter ansver 3'  value={info.ansvers[2].ansver}  onChange={(e)=>ChangeAnsver(e)(2)}/>
                      <Input mb='10px' placeholder='Enter true Ansver ' name='trueAnsver'  value={info.trueAnsver}  onChange={(e)=>HandClick(e)}/>
                      {error}
                      <ButtonForm>Create</ButtonForm>
                   </Form>
                </FormsDiv>
            </Container>
    )
}
