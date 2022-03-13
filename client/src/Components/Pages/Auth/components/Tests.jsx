import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
  @media (max-width: 768px) 
  {
      font-size: 1.9rem !important;
  }
  @media (max-width: 552px) 
  {
      font-size: 1.5rem !important;
  }
`

export default function Tests() {
  const [tests,setTests] = useState([])
  useEffect(()=>{
    axios.post('/api/top').then(res=>setTests(res.data.tests))
  },[])
  return (
    <TestsComponent>
        <NewTitle>Most Popular Quiz</NewTitle>
        <Container>
            {tests.map((e)=>{
              return <Test title={e.title} subTitle={e.text} testId={e._id} key={e._id}></Test>
            })}
        </Container>
    </TestsComponent>
  )
}
