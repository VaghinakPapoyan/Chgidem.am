import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux'
import { logout } from '../../hooks/useUser.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeThemeAction } from '../../redux/store.js'

const HeaderComponent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 0px;
    position: relative;
`
const Logo = styled.h1` 
    color: ${props => props.theme.colors.mainTextColor};
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
export const Button = styled(Link)` 
    padding: 12px 27px;
    border-radius: 6px;
    border: none;
    outline: none !important;
    letter-spacing: -0.005em;
    text-decoration: none !important;
    overflow: hidden;
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
    @media (max-width: 768px) 
    {
        padding: 8px 21px;
    }
    @media (max-width: 425px) 
    {
        &:last-child
        {
            display: none;
        }
    }
`
const ButtonInnerText = styled.p` 
    font-size: 16px;
    transition: 0.4s;
    pointer-events: none;
    font-weight: 500;
    position: relative;
    color: ${props => props.theme.colors.secondTextColor};
    z-index: 3;
    @media (max-width: 768px) 
    {
        font-size: 14px;
    }
`
const HeaderNavigation = styled.ul `
    list-style: none;
    display: flex;
    justify-content: flex-start;
    margin-left: 84px;
    align-items: center;
    @media (max-width: 768px) 
    {
        position: absolute;
        left: 50%;
        margin: 0;
        top: 100%;
        z-index: 10;
        transform: translate(-50%, 0);
        overflow: hidden;
        transition: 0.4s;
        max-height: 0;
        background-color: #f7f7f7;
        border-radius: 4px;
        -webkit-box-shadow: 0px 8px 13px -2px rgba(210, 210, 210, 0.26);
        -moz-box-shadow: 0px 8px 13px -2px rgba(210, 210, 210, 0.26);
        box-shadow: 0px 8px 13px -2px rgba(210, 210, 210, 0.26);
        width: 100%;
        flex-direction: column;
        transition: 0.4s;
        justify-content: center;
        ${ ({ active }) => active ? "max-height: 140px;" : null  }
    }
`
const HeaderNavigate = styled.li`
    margin-right: 60px;
    @media (max-width: 768px) 
    {
        margin: 12.5px 0;
    }
    &:last-child
    {
        margin-right: 0;
    }
`
const NavigateText = styled(Link)`
    font-size: 17px;
    font-weight: 500;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.mainTextColor};
    padding-bottom: 3px;
    letter-spacing: -0.5px;
    cursor: pointer;
    ${({active, theme}) => active === "true" ? `border-bottom: 2px solid ${theme.colors.thirdTextColor};` : null}
    &:hover
    {
        color: ${({ theme }) => theme.colors.thirdTextColor};
    }
`
const Left = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const User = styled.div`
    border-radius: 6px !important;
    position: relative;
    z-index: 2;
    cursor: pointer;
    padding: 8px 21px;
    padding-right: 10.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondColor};
    img
    {
        width: 30px;
        height: 30px;
        margin-left: 15px;
        border-radius: 4px;
    }
    p
    {
        font-size: 14px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.secondTextColor};
    }
    @media (max-width: 768px) 
    {
        padding: 6px 16px;
        padding-right: 9px;
        p
        {
            font-size: 13px;
        }
        img
        {
            width: 25px;
            height: 25px;
            margin-left: 10px;
        }
    }
`
const MenuButton = styled.button` 
    cursor: pointer;
    background-color: transparent;
    border: 0;
    overflow: hidden;
    display: none;
    transition: 0.4s;
    outline: 0;
    padding: 0;
    ${({ active }) => active ? "transform: translateX(5px);" : null}

    @media (max-width: 768px) 
    {
        display: block;
    }
`
const MenuButtonLine = styled.div`
    width: 30px;
    height: 3px;
    transition: 0.4s;
    background-color: ${({ theme }) => theme.colors.secondColor};
    margin: 5px 0;
    transform-origin: left center;
    :first-child
    {
        ${({ active }) => active ? "transform: rotate(45deg) translateY(-3.5px);" : null}
    }
    :nth-child(2)
    {
        ${({ active }) => active ? "transform: translateX(100%)" : null}
    }
    :last-child
    {
        ${({ active }) => active ? "transform: rotate(-45deg) translateY(3.5px);" : null}
    }
`
const UserDropdown = styled.div` 
    position: absolute;
    left: 50%;
    top: 0;
    opacity: 0;
    transition: 0.4s;
    z-index: 10;
    transform: translate(-50%, 15px);
    width: 100%;
    border-radius: 6px;
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.secondColor};
    ${({active}) => active ? "opacity: 1; top: 100%; pointer-events: auto;" : null}
`
const UserDropdownElement = styled.p` 
    color: ${({ theme }) => theme.colors.secondTextColor};
    font-size: 0.75rem !important;
    text-align: center;
    padding: 12px 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
    &:first-child
    {
        margin-top: 0;
    }
`
const UserDropdownLink = styled(Link)` 
    color: ${({ theme }) => theme.colors.secondTextColor} !important;
    font-size: 0.75rem !important;
    text-align: center;
    padding: 12px 0;
    font-weight: 600;
    display: block;
    text-decoration: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
    &:first-child
    {
        margin-top: 0;
    }
`
const UserDropdownElementFlex = styled.div` 
    color: ${({ theme }) => theme.colors.secondTextColor};
    font-size: 0.75rem !important;
    text-align: center;
    font-weight: 600;
    padding: 12px 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
    &:first-child
    {
        margin-top: 0;
    }
    display: flex;
    justify-content: center;
    align-content: center;
`
const ChangeDarkMode = styled.div` 
    width: 40px;
    margin-left: 10px;
    height: 15px;
    background-color: ${({ theme }) => theme.colors.mainColor};
    border-radius: 35px;
    position: relative;
    &:before
    {
        content: "";
        height: 12px;
        width: 12px;
        position: absolute;
        left: 3px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.secondColor};
        ${({ active }) => active ? " left: 100%; transform: translateY(-50%) translateX(-100%) translateX(-3px); " : null}
    }
`

const userImg = "/images/user.png";

 function Header({auth}) {
    const [ menuActive, setMenuActive ] = useState(false)
    const [ menuDropdownActive, setMenuDropdownActive ] = useState(false)
    const user = useSelector(state=>state.user) 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const lastPath = pathname.split('/')[pathname.split('/').length - 1]

    const changeTheme = () => 
    {
        dispatch(changeThemeAction());
    }

    if(auth)
    {
        return (
            <HeaderComponent>
                <Left>
                    <Logo>Ch<SpanLogo>gidem.</SpanLogo></Logo>
                    <HeaderNavigation active={menuActive}>
                        <HeaderNavigate>
                            <NavigateText active={lastPath === "" ? "true" : "false"} to="/">Home</NavigateText>
                        </HeaderNavigate>
                        <HeaderNavigate>
                            <NavigateText active={lastPath === "create-quiz" ? "true" : "false"} to="/create-quiz">Create Quiz</NavigateText>
                        </HeaderNavigate>
                        <HeaderNavigate>
                            <NavigateText active={lastPath === "Tests" ? "true" : "false"} to="/Tests">Tests</NavigateText>
                        </HeaderNavigate>
                    </HeaderNavigation>
                </Left>
                <MenuButton active={menuActive} onClick={() => setMenuActive(state => !state)}>
                    <MenuButtonLine active={menuActive} />
                    <MenuButtonLine active={menuActive} />
                    <MenuButtonLine active={menuActive} />
                </MenuButton>
                <Buttons>
                    <User active={menuActive} to="#" onClick={() => setMenuDropdownActive(state => !state)}>
                        <p>{user.username}</p>
                        <img src={user.avatar ? user.avatar : userImg} alt="User"/>
                        <UserDropdown active={menuDropdownActive}>
                            <UserDropdownLink to="/edit-profile">
                                Edit Profile
                            </UserDropdownLink>
                            <UserDropdownLink to='/quizes'>
                                Your Quizes
                            </UserDropdownLink>
                            <UserDropdownElementFlex onClick={() => changeTheme()}>
                                Dark mode <ChangeDarkMode />
                            </UserDropdownElementFlex>
                            <UserDropdownElement onClick={()=>logout(dispatch,navigate)}>
                                Logout
                            </UserDropdownElement>
                        </UserDropdown>
                    </User>
                </Buttons>
            </HeaderComponent>
        )
    }
    else
    {
        return (
            <HeaderComponent>
                <Logo>Ch<SpanLogo>gidem.</SpanLogo></Logo>
                <Buttons>
                    <Button to="/account/registration">
                        <ButtonInnerText>Registation</ButtonInnerText>
                    </Button>
                    <Button to="/account/log-in"><ButtonInnerText>Log In</ButtonInnerText></Button>
                </Buttons>
            </HeaderComponent>
        )
    }
}

export default memo(Header,(prevProps, nextProps)=>{
    if(prevProps === nextProps){
        return false
    }
    return false
  })
