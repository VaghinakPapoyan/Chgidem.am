import React from 'react'
import styled from 'styled-components'
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'
import { Input, Label, InputDiv, Title } from '../Form/Form'
import { ButtonForm } from '../Create Quiz/CreateQuiz'
import { useSelector } from "react-redux"

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
        background-color: rgba(0,0,0, 0.4);
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
const UserInfo = styled.div `
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
`
const Camera = styled.img`
    width: 48px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
`

const userImg = process.env.PUBLIC_URL + "images/user.png";
const camera = process.env.PUBLIC_URL + "images/camera.png";

export default function EditProfile() {
    const { username } = useSelector(state => state.user)
    return (
        <Container>
            <Header auth page="edit-profile"/>
            <EditProfileComponent>
                <UserInfo>
                    <MyTitle>My Profile</MyTitle>
                    <InputDiv>
                        <MyLabel htmlFor='username'>Name</MyLabel>
                        <Input autoComplete="off" id='username' defaultValue={username} placeholder='Write your name.' />
                    </InputDiv>
                    <InputDiv>
                        <MyLabel htmlFor='username'>Last Name</MyLabel>
                        <Input autoComplete="off" id='username' placeholder='Write your last name.' />
                    </InputDiv>
                    <MyButton>Change</MyButton>
                </UserInfo>
                <UserImgDiv>
                    <Camera src={camera} />
                    <UserImg src={userImg} />
                </UserImgDiv>
            </EditProfileComponent>
        </Container>
    )
}
