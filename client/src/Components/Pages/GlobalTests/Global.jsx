import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'
import { MyButton, SubTitle, TestComponent } from "../Auth/components/Test";
import TestsButtons from './TestsButtons';


export const TestsFlex = styled.div`
    margin-top:20px;
    width:100%;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
`
const Test = styled(TestComponent)`
    background:${({ theme }) => theme.colors.mainTextColor};
`
const Text = styled(SubTitle)`
    color:${({ theme }) => theme.colors.mainColor};
`
const ButtonTest = styled(MyButton)`
    background:${({ theme }) => theme.colors.mainColor};
    color:${({ theme }) => theme.colors.mainTextColor};
`

export default function Global(){
    const [length,setLength] = useState([])
    const [tests,setTests] = useState([])
    useEffect( async () => {
        const data2 = await axios.post('/api/get/start')
        setTests(data2.data.tests)
        const data = await axios.post('/api/get/length')
        setLength(data.data.length)
    },[] )
    return (
        <Container>
            <Header auth page='tests'/>
            <TestsFlex>
                {tests.map((e)=>{
                    return (
                        <Test  text key={e._id}>
                            <Text  mb text>Title : {e.title}</Text>
                            <Text  mb text>Text :  {e.text}</Text>
                            <Text  mb text>Ansvers: {e.ansvers.length}</Text>
                            <ButtonTest  to='/questions' >Answer</ButtonTest>
                        </Test>
                    )
                })}
                <TestsButtons length={length} setData={(tests)=>setTests(tests)}/>
            </TestsFlex>
        </Container>
    )
}