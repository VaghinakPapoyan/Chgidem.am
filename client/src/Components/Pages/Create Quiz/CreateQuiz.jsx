import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { createTest } from '../../../hooks/useTest'
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'


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
    width: 100%;
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
    margin-top: 13px;
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
                      <TitleForm>Creating Test</TitleForm>
                      <Input mb='10px' placeholder='Enter test title pls.' name='title' onChange={(e)=>HandClick(e)}/>
                      <Input mb='10px' placeholder='Enter test description pls.' name='about' onChange={(e)=>HandClick(e)}/>
                        <Error> {error}</Error>
                      <ButtonForm>Create</ButtonForm>
                   </Form>
                </FormsDiv>
            </Container>
        </div>
    )
}
