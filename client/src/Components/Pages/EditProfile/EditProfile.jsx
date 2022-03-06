import React from 'react'
import styled from 'styled-components'
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'

const EditProfileComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const UserImg = styled.img `
    width: 20%;
    border-radius: 50%;
    &:before
    {
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.2);
    }
`

const userImg = process.env.PUBLIC_URL + "images/user.png";

export default function EditProfile() {
    return (
        <Container>
            <Header auth page="edit-profile"/>
            <EditProfileComponent>
                <UserImg src={userImg} />
            </EditProfileComponent>
        </Container>
    )
}
