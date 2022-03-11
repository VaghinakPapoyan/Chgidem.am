import React from 'react'
import styled from 'styled-components'
import { Container } from '../../../../styles/styles'
import Test from './Test'
import { TitleComponent } from './Title.jsx'

export const TestsComponent = styled.div` 
    background-color: ${({ theme }) => theme.colors.secondColor};
    display:${props=>props.displayI?props.displayI:"block"};
    & > div
    {
        display: flex;
        padding-bottom: 60px;
        justify-content: center;
        align-items: start;
        flex-wrap: wrap;
    }
    border-radius:${props=>props.br?"20px":"0px"};
`
export const NewTitle = styled(TitleComponent)`
  padding-top: 45px;
  padding-bottom: 25px;
  border:none;
  @media (max-width: 992px){
    font-size: 25px;
  }

`

export default function Tests() {
  return (
    <TestsComponent>
        <NewTitle>Most Popular Quiz</NewTitle>
        <Container>
            <Test title="React Question" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Question about armenia" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Best Question" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Fast fizik Text" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Test your soft skills" subTitle="Simply dummy text of the printing and type settings."></Test>
            <Test title="Programer Test" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Testing your mathemathiks" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Question About Biology" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
        </Container>
    </TestsComponent>
  )
}
