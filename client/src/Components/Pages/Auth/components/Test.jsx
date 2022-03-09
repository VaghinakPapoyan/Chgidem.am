import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../Main-Components/Header'

export const TestComponent = styled.div` 
    background-color: ${({ theme }) => theme.colors.mainColor};
    border-bottom: 5px solid ${({ theme }) => theme.colors.thirdColor};
    -webkit-box-shadow: 0px 0px 17px 0px rgba(255, 255, 255, 0.17);
    -moz-box-shadow: 0px 0px 17px 0px rgba(255, 255, 255, 0.17);
    box-shadow: 0px 0px 17px 0px rgba(255, 255, 255, 0.17);
    padding: 15px 20px;
    padding-top: 15px;
    width: 23%;
    min-width: 230px;
    border-radius: 16px;
    margin: 0px 1%;
    margin-top: 20px;
`
export const Title = styled.h4`
    font-size: 1.35rem;
    font-weight: 800;
    text-align: center;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.mainTextColor};
`
export const SubTitle = styled.p`
    font-size: 0.9rem;
    font-weight: 400;
    margin-top: 10px;
    text-align:${props=>props.text?'start':'center'};
    margin-bottom:${props=>props.mb?"15px":"0px"};
    color: ${({ theme }) => theme.colors.mainTextColor};
`
export const MyButton = styled(Button)` 
    color: white !important;
    position: relative;
    margin-top: 15px;
    display: inline-block;
    left: 50%;
    font-size: 14px;
    font-weight: 600;
    transform: translateX(-50%);
`
export default function Test({ title, subTitle }) {
  return (
    <TestComponent>
        <Title>{ title }</Title>
        <SubTitle>{ subTitle }</SubTitle>
        <MyButton to="#">Start Test</MyButton>
    </TestComponent>
  )
}
