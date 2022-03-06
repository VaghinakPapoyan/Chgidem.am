import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {  questAdd } from '../../../hooks/useTest'
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'
import { Quests } from './Quests'


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
 const TitleForm = styled.div`
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
 const ButtonForm = styled.button`
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
export default function Questions() {
    const [info,setInfo] = useState({
        title:'',
        quest:'',
        ansvers:[{ansver:''},{ansver:''},{ansver:''}],
        trueAnsver:''
    })
    const dispatch = useDispatch()
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
    const AddQuest = (e)=>{
        e.preventDefault()
        if(info.title.length<4){
            setErrors('title minimum length was 4')
        }else if(info.quest.length<8){
            setErrors('quest minimum length was 8')
        }else if(info.ansvers[0].ansver === '' && info.ansvers[1].ansver===''){
            setErrors('minimum ansvers was 2')
        }else if(info.ansvers[1].ansver === '' && info.ansvers[2].ansver===''){
            setErrors('minimum ansvers was 2')
        }else if(info.ansvers[0].ansver == '' && info.ansvers[2].ansver===''){
            setErrors('minimum ansvers was 2')
        }else if(info.trueAnsver===''){
            setErrors("True Ansver was not been empty")
        }else if(info.trueAnsver!==info.ansvers[0].ansver && info.trueAnsver!==info.ansvers[1].ansver && info.trueAnsver!==info.ansvers[2].ansver){
            setErrors("True Ansver was not true")
        }else{
            dispatch({
                type:'addquest',
                quest:info,
            })
            setInfo({
                title:'',
                quest:'',
                ansvers:[{ansver:''},{ansver:''},{ansver:''}],
                trueAnsver:''
            })
            setErrors('')
        }
     
    }
    return (
        <>
            <Container>
                <Header page="create-quiz" auth />
                <FormsDiv>
                  <Form onSubmit={(e)=>AddQuest(e)}>
                      <TitleForm>Add Questions</TitleForm>
                      <Input mb='10px' placeholder='Enter quest title' value={info.title} name='title' onChange={(e)=>HandClick(e)}/>
                      <Input mb='10px' placeholder='Enter quest' value={info.quest} name='quest' onChange={(e)=>HandClick(e)}/>
                      <Input mb='10px' placeholder='Enter ansver 1' value={info.ansvers[0].ansver}   onChange={(e)=>ChangeAnsver(e)(0)}/>
                      <Input mb='10px' placeholder='Enter ansver 2'  value={info.ansvers[1].ansver}  onChange={(e)=>ChangeAnsver(e)(1)}/>
                      <Input mb='10px' placeholder='Enter ansver 3'  value={info.ansvers[2].ansver}  onChange={(e)=>ChangeAnsver(e)(2)}/>
                      <Input mb='10px' placeholder='Enter true Ansver ' name='trueAnsver'  value={info.trueAnsver}  onChange={(e)=>HandClick(e)}/>
                    <Error>{error}</Error>
                      <ButtonForm>Create</ButtonForm>
                   </Form>
                </FormsDiv>
            </Container>
            <Quests/>
        </>
    )
}
