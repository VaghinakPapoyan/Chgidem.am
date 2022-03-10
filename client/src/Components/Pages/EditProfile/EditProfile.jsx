import React, { useCallback, useState } from 'react'
import styled, {keyframes} from 'styled-components'
import { Container } from '../../../styles/styles'
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
const ImgMessage = styled(Message)`
    text-align: center;
    position: absolute;
    left: 50%;
    top: 100%;
    font-size: 1.2rem;
    white-space: nowrap;
    transform: translate(-50%, 5px);
`
const rotate = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`
const Load = styled.div`
    width: 25px;
    height: 25px;
    border: 3px solid ${({ theme }) => theme.colors.secondColor};
    border-radius: 50%;
    position: relative;
    animation: ${rotate} 1.5s linear infinite;
    &:before
    {
        content: "";
        width: 8px;
        height: 8px;
        position: absolute;
        left: 50%;
        top: 0px;
        transform: translateX(-50%) translateY(-4.5px);
        background-color: ${({ theme }) => theme.colors.mainColor};
    }
`

const userImg = process.env.PUBLIC_URL + "images/user.png";
const camera = process.env.PUBLIC_URL + "images/camera.png";

export default function EditProfile() {
    const { username, nickname, avatar } = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [messageImg, setMessageImg] = useState(null)
    const [form, setForm] = useState(
    {
        nickname: nickname,
        username: username,
        token: localStorage.getItem("User")
    })
    const changeForm = useCallback(e => 
    {
        setForm({ ...form, [e.target.name]: e.target.value })
    }, [form])
    return (
        <Container>
            <EditProfileComponent>
                <UserInfo onSubmit={e => updateData(e)(form, setError, setMessage, setLoading)}>
                    <MyTitle>My Profile</MyTitle>
                    <InputDiv>
                        <MyLabel htmlFor='username'>Username</MyLabel>
                        <Input onChange={changeForm} name="username" autoComplete="off" id='username' defaultValue={username} placeholder='Write your name.' />
                    </InputDiv>
                    <InputDiv>
                        <MyLabel htmlFor='username'>Nickname</MyLabel>
                        <Input onChange={changeForm} name="nickname" autoComplete="off" id='nickname' placeholder='Write your last nickame.' defaultValue={nickname}/>
                    </InputDiv>
                    <Message>{loading ? <Load /> : message}</Message>
                    <NewError>{error}</NewError>
                    <MyButton>Change</MyButton>
                </UserInfo>
                <UserImgDiv>
                    <Camera src={camera} />
                    <UserImg src={avatar ? avatar : userImg} />
                    <FileInput type="file" onChange={e => ChangeImg(e)(setMessageImg, setLoading)}/>
                    <ImgMessage>{loading ? <Load /> : messageImg}</ImgMessage>
                </UserImgDiv>
            </EditProfileComponent>
        </Container>
    )
}
