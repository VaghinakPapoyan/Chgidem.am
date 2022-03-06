import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { createTest } from '../../../hooks/useTest'
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
 const Error = styled.div`
    width:100%;
    text-align:start;
    font-size:16px;
    color:${({ theme }) => theme.colors.thirdColor};
    opacity:0.8;
    margin:10px 0px;
 `
export default function CreateQuiz() {
    const [info,setInfo] = useState({
        title:'',
        about:''
    })
    const [error,setError] = useState()
    const navigate = useNavigate()
    const HandClick = (e) =>{
        setInfo({...info,[e.target.name]:e.target.value})
    }
    
    return (
        <div>
            <Container>
                <Header page="create-quiz" auth />
                <FormsDiv>
                  <Form  onSubmit={(e)=>createTest(e)(info,navigate,setError)}>
                      <TitleForm>Create Test</TitleForm>
                      <Input mb='10px' placeholder='Enter test name' name='title' onChange={(e)=>HandClick(e)}/>
                      <Input mb='10px' placeholder='Enter about test' name='about' onChange={(e)=>HandClick(e)}/>
                        <Error> {error}</Error>
                      <ButtonForm>Create</ButtonForm>
                   </Form>
                </FormsDiv>
            </Container>
        </div>
    )
}
