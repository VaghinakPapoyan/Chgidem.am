import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'
import { sendForm, sendLogin, registration, changePassword } from '../../../hooks/useUser'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const Title = styled.h2`
    font-size: 36px;
    margin-top: 100px;
    text-align: center;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainTextColor};
    margin-bottom: 50px;
`
const FormComponent = styled.form`
    position: relative;
    width: 400px;
    left: 50%;
    display: inline-block;
    transform: translateX(-50%);
`
export const Input = styled.input`
    display: block;
    color: ${({ theme }) => theme.colors.mainTextColor};
    width: 100%;
    border: none;
    font-size: 0.9rem;
    outline: none !important;
    padding: 7px 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondColor};

`
export const Label = styled.label` 
    font-size: 1.1rem;
    display: block;
    color: ${({ theme }) => theme.colors.mainTextColor};
    font-weight: 600;
    margin-top: 25px;
    margin-bottom: 3px;
`
const ThisButton = styled.button` 
    padding: 12px 27px;
    border-radius: 6px;
    border: none;
    outline: none !important;
    letter-spacing: -0.005em;
    text-decoration: none !important;
    overflow: hidden;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.secondColor};
    position: relative;
    font-weight: 600;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondTextColor};
`
const ValidationInput = styled(Input)`
    border-color: ${({ theme }) => theme.colors.thirdColor};
`
export const InputDiv = styled.div` 

`
export const Error = styled.div` 
    font-weight: 600;
    margin-top: 25px;
    color: ${({theme}) => theme.colors.thirdColor};
`
const SignupFooter = styled.div`
    display: flex;
    margin-top: 25px;
    justify-content: center;
    align-items: center;
`
const Forget = styled(Link)`
    background-color: transparent;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.mainTextColor};
    outline: none !important;
    margin-left: 20px;
    border: none;
`

export default function Form({login,changePassword}) 
{
    const [form, setForm] = useState(
    {
        email: "",
        username: "",
        password: ""
    })
    
    const [error, setError] = useState("")
    const [code, setCode] = useState(0);
    const [next, setNext] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const changeForm = e => 
    {
        setForm(form => ({...form, [e.target.name]: e.target.value }))
    }
    const Submit = e => 
    {
        if(next)
            registration(e)(code, setError, dispatch, navigate)
        else
            sendForm(e)(form, setError, setNext)
    }
    const forgetSubmit = e => 
    {
        e.preventDefault();
        console.log("asdfkjslad;f");
        if(next)
            registration(e)(code, setError, dispatch, navigate)
        else
            changePassword(e)(form.email, setError, setNext)
    }
    if(!login)
    {
        return (
            <Container>
                <Header />
                <FormComponent 
                    onSubmit={e => Submit(e)}>
                    <Title>Registration</Title>
                    <InputDiv>
                        <Label htmlFor='email'>Email</Label>
                        <Input autoComplete="on" name="email" onChange={e => changeForm(e)} id='email' placeholder='Write your email.'/>
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor='username'>Username</Label>
                        <Input autoComplete="off" name="username" onChange={e => changeForm(e)} id='username' placeholder='Write your username.' />
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor='password'>Password</Label>
                        <Input autoComplete="off" type="password" name="password" onChange={e => changeForm(e)} id='password' placeholder='Write your password.' />
                    </InputDiv>
                    { 
                        next 
                        ?
                        <InputDiv>
                            <Label htmlFor='validataion-code'>We send code in your email</Label>
                            <ValidationInput autoComplete="off" onChange={e => setCode(e.target.value)} value={code} type="password" name="validataion-code" id='validataion-code' placeholder='Write your validation code.' />
                        </InputDiv> 
                        : null 
                    }
                    <Error>{ error }</Error>
                    <SignupFooter>
                        <ThisButton>Sign in</ThisButton>
                    </SignupFooter>
                </FormComponent>
            </Container>
        )
    }
    else if(changePassword)
    {
        return (
            <Container>
                <Header />
                <FormComponent onSubmit={e => forgetSubmit(e)}>
                    <Title>Forget Password</Title>
                    <InputDiv>
                        <Label htmlFor='email'>Email</Label>
                        <Input autoComplete="on" name="email" onChange={e => changeForm(e)} id='email' placeholder='Write your email or username.'/>
                    </InputDiv>
                    { 
                        next 
                        ?
                        <InputDiv>
                            <Label htmlFor='validataion-code'>We send code in your email</Label>
                            <ValidationInput autoComplete="off" onChange={e => setCode(e.target.value)} value={code} type="password" name="validataion-code" id='validataion-code' placeholder='Write your validation code.' />
                        </InputDiv> 
                        : null 
                    }
                    <Error>{ error }</Error>
                    <SignupFooter>
                        <ThisButton>Send Code</ThisButton>
                    </SignupFooter>
                </FormComponent>
            </Container>
        )
    }
    else
    {
        return (
            <Container>
                <Header />
                <FormComponent onSubmit={e=>sendLogin(e)(form,setError,navigate,dispatch)}>
                    <Title>Log In</Title>
                    <InputDiv>
                        <Label htmlFor='email'>Email</Label>
                        <Input autoComplete="on" name="email" onChange={e => changeForm(e)} id='email' placeholder='Write your email or username.'/>
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor='password'>Password</Label>
                        <Input autoComplete="off" type='password'  name="password"  onChange={e => changeForm(e)} id='password' placeholder='Write your password.' />
                    </InputDiv>
                    <Error>{ error }</Error>
                    <SignupFooter>
                        <ThisButton>Sign up</ThisButton>
                        <Forget to="/account/forget-password">forget password?</Forget>
                    </SignupFooter>
                </FormComponent>
            </Container>
        )
    }
}
