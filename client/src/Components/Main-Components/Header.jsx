import React from 'react'
import styled from 'styled-components'

const HeaderComponent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 0px;
`
const Logo = styled.h1` 
    color: ${props => props.theme.colors.firstTextColor};
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -1px;
    text-align: left;
`
const SpanLogo = styled.span` 
    color: ${props => props.theme.colors.thirdTextColor};
`
const Buttons = styled.div` 
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const Button = styled.button` 
    padding: 12px 27px;
    border-radius: 6px;
    border: none;
    outline: none !important;
    letter-spacing: -0.005em;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.secondColor};
    margin-right: 15px;
    position: relative;
    cursor: pointer;
    &:before
    {
        content: "";
        width: 0px;
        height: 0px;
        opacity: 0.15;
        position: absolute;
        left: 50%;
        pointer-events: none;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        transition: 0.4s;
        z-index: 2;
        background-color: ${props => props.theme.colors.mainColor};
    }
    &:hover:before
    {
        width: 170px;
        height: 170px;
    }
    &:last-child
    {
        margin-right: 0px;
    }
`
const ButtonInnerText = styled.p` 
    font-size: 16px;
    transition: 0.4s;
    font-weight: 500;
    position: relative;
    color: ${props => props.theme.colors.secondTextColor};
    z-index: 3;
`


export default function Header(auth) {

    return (
        <HeaderComponent>
            <Logo>Ch<SpanLogo>gidem.</SpanLogo></Logo>
            <Buttons>
                <Button>
                    <ButtonInnerText>Registation</ButtonInnerText>
                </Button>
                <Button><ButtonInnerText>Log In</ButtonInnerText></Button>
            </Buttons>
        </HeaderComponent>
    )
}
