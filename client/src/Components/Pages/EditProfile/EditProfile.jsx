import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'
import { Input, Label, InputDiv, Title, Error } from '../Form/Form'
import { ButtonForm } from '../Create Quiz/CreateQuiz'
import { useSelector } from "react-redux"
import { ChangeImg } from '../../../hooks/useUser.js'
import { updateData } from '../../../hooks/useUser.js'

const EditProfileComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`
const UserImgDiv = styled.div`
    width: 25%;
    position: relative;
    cursor: pointer;
    &:before
    {
        content: "";
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.5);
        transition: 0.4s;
    }
    &:hover:before
    {
        content: "";
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.6);
    }
`
const UserImg = styled.img `
    display: block;
    width: 100%;
    border-radius: 50%;
`
const UserInfo = styled.form `
    width: 30%;
    margin-right: 5%;
`
const MyTitle = styled(Title)`
    text-align: left;
    margin-bottom: 30px;
    margin-top: 0;
`
const MyLabel = styled(Label)`  
    margin-top: 15px;
`
const MyButton = styled(ButtonForm)`  
    font-size: 14px;
    margin-top: 15px;
`
const Camera = styled.img`
    width: 48px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
`
const NewError = styled(Error)`
    margin-top: 10px;
`
const Message = styled(NewError)` 
    color: ${({ theme }) => theme.colors.mainTextColor};
`
const FileInput = styled.input`
    opacity: 0;
    display: block;
    position: absolute;
    left: 50%;
    border-radius: 50%;
    top: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
`

const userImg = process.env.PUBLIC_URL + "images/user.png";
const camera = process.env.PUBLIC_URL + "images/camera.png";

export default function EditProfile() {
    const { username, nickname } = useSelector(state => state.user)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState(
    {
        nickname: nickname,
        username: username,
        token: localStorage.getItem("User")
    })
    const changeForm = e => 
    {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <Container>
            <Header auth page="edit-profile"/>
            <EditProfileComponent>
                <UserInfo onSubmit={e => updateData(e)(form, setError, setMessage)}>
                    <MyTitle>My Profile</MyTitle>
                    <InputDiv>
                        <MyLabel htmlFor='username'>Username</MyLabel>
                        <Input onChange={changeForm} name="username" autoComplete="off" id='username' defaultValue={username} placeholder='Write your name.' />
                    </InputDiv>
                    <InputDiv>
                        <MyLabel htmlFor='username'>Nickname</MyLabel>
                        <Input onChange={changeForm} name="nickname" autoComplete="off" id='nickname' placeholder='Write your last nickame.' defaultValue={nickname}/>
                    </InputDiv>
                    <Message>{message}</Message>
                    <NewError>{error}</NewError>
                    <MyButton>Change</MyButton>
                </UserInfo>
                <UserImgDiv>
                    <Camera src={camera} />
                    <UserImg src={userImg} />
                    <FileInput type="file" onChange={e => ChangeImg(e)(setMessage)}/>
                </UserImgDiv>
            </EditProfileComponent>
        </Container>
    )
}
