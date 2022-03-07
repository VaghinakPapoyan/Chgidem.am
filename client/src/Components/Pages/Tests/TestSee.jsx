import { useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Container } from "../../../styles/styles"
import Header from "../../Main-Components/Header"
import TestInfo from "./TestInfo"
import { TestMap } from "./TestMap"

const Home = styled.div`
`
const Flex = styled.div`
    display:flex;
    margin-top:40px;
`
export default function  TestSee(){
    const [info,setInfo] = useState({
        testId:'',
        text:''
    })  
    return(
        <Home>
            <Container>
                <Header auth/>
                <Flex>
                    <TestMap changeId = {(id,text)=>setInfo({testId:id,text})}></TestMap>
                    <TestInfo testInfo={info}></TestInfo>
                </Flex>
            </Container>
        </Home>
    )
}