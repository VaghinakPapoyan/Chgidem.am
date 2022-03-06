import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
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
    visibility:${params=> params.display ? 'visible' : 'hidden'};
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
export default function CreateQuiz() {
    const [info,setInfo] = useState({
        titleTest:'',
        hidden:true
    })
    const HandClick = (e) =>{
        setInfo({...info,[e.target.name]:e.target.value})
    }
    
    return (
        <div>
            <Container>
                <Header page="create-quiz" auth />
                <FormsDiv>
                  <Form display={info.hidden}>
                      <TitleForm>Create Test</TitleForm>
                      <Input mb='10px' placeholder='Enter test name' name='titleTest' onChange={(e)=>HandClick(e)}/>
                      <ButtonForm>Create</ButtonForm>
                   </Form>
                </FormsDiv>
            </Container>
        </div>
    )
}
