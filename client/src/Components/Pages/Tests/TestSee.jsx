import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Container } from "../../../styles/styles"
import { GetTests } from "../../../hooks/useTest"
import TestAnsvers  from "./TestAnsvers"
import TestInfo from "./TestInfo"
import { TestMap } from "./TestMap"

const Home = styled.div`
`
const Flex = styled.div`
    display:flex;
    margin-top:40px;
    min-height:80vh;
    @media (max-width: 992px) {
        flex-direction: column;
    }
`
export default function  TestSee(){
    const [info,setInfo] = useState({
        testId:'',
        text:''
    })
    const dispatch = useDispatch()

    useEffect(()=>{
        GetTests(dispatch)
    },[] )  

    return(
        <Home>
            <Container>
                <Flex>
                    <TestMap changeId = {(id,text)=>setInfo({testId:id,text})} id={info.testId}></TestMap>
                    <TestInfo testInfo={info}  changeId = {(id,text)=>setInfo({testId:id,text})}></TestInfo>
                </Flex>
            </Container>
        </Home>
    )
}