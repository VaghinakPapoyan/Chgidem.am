import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../../styles/styles'
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
const Form = styled.div`
    widht:100%;
    display:flex;
    align-items:center;
    margin:20px 0px;
    padding:0px 40px;
`
const Search = styled.input`
    width:100%;
    border:1px solid ${({ theme }) => theme.colors.mainTextColor};
    color:${({ theme }) => theme.colors.mainTextColor};
    font-size:16px;
    outline:none;
    border-radius:5px;
    padding:10px 15px;
    margin-right:20px;
    transition:0.3s;
    &:focus{
        border-radius:20px;
    }
`
const SearchButton = styled.button`
    border:1px solid ${({ theme }) => theme.colors.mainTextColor};
    color:${({ theme }) => theme.colors.mainTextColor};
    background:inherit;
    padding:10px 15px;
    border-radius:5px;
    font-weight:500;
    font-size:16px;
    cursor:pointer;
    transition:0.3s;
    &:hover{
        color:${({ theme }) => theme.colors.mainColor};
        background:${({ theme }) => theme.colors.mainTextColor};
    }
`
export default function Global(){
    const [length,setLength] = useState([])
    const [tests,setTests] = useState([])
    const [searchText,setSearchText] = useState('')

    useEffect( () => {
        async function Fetch () {
            const data2 = await axios.post('/api/get/start')
            setTests(data2.data.tests)
            const data = await axios.post('/api/get/length')
            setLength(data.data.length)
        }
        Fetch()
    },[] )

    const SearchForm = async () =>{
        const data = await axios.post('/api/get/search',{textSearch:searchText})
        setTests(data.data.result)
        setLength([])
    }

    return (
        <Container>
            <Form>
                <Search value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder='Search'/>
                <SearchButton onClick={SearchForm}>Search</SearchButton>
            </Form>
            <TestsFlex>
                {tests.length === 0 ? "not found" : " " }
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