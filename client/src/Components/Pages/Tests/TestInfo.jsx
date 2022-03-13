import { useState } from "react"
import { useEffect } from "react"
import { memo } from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"
import { GetQuests, GetTests } from "../../../hooks/useTest"
import { Container } from "../../../styles/styles";
import {  SubTitle, TestComponent } from "../Auth/components/Test";
import { NewTitle, TestsComponent } from "../Auth/components/Tests";
import axios from "axios"
import { useDispatch } from "react-redux"
import TestAnsvers from "./TestAnsvers"
import { ThisSubTitle, ThisSubTitleBold } from "../Create Quiz/Quests"

const Info = styled.div`
    margin-left:20px;
    padding-top:20px;
    width:100%;
    @media (max-width: 992px){
        margin-left:0px;
    }
`
const Text = styled.p`
    margin-bottom:10px;
    font-size:18px;
    font-weight:600;
    color: ${({ theme }) => theme.colors.mainTextColor};
    margin-bottom:20px;
`
const ButtonAdd = styled(Link)`
    padding:10px 15px;
    font-size: 1rem;
    border-radius: 6px;
    font-weight: 600;
    margin-top: 15px;
    background:inherit;
    text-decoration:none;
    color:${({ theme }) => theme.colors.mainColor};
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    cursor:pointer;
    transition:0.3s;
    &:hover{
        background:${({ theme }) => theme.colors.mainColor};
        color:${({ theme }) => theme.colors.secondColor};
    }
    margin-right:${props=>props.mr==='true'?'10px':'0px'};
`
const Infos = styled.div`
    display:flex;
`
const ThisLink = styled(Link)` 
    color: ${({ theme }) => theme.colors.thirdColor};
    text-decoration: none;
`
const QueryButton  = styled(Link)`
    padding:10px 15px;
    border-radius:3px;
    background:inherit;
    font-size:14px;
    transition:0.3s;
    margin-top:5px;
    text-decoration:none;
    ${props=>
    props.query==='true'
    ?
        `
            background:${ props.theme.colors.mainTextColor};
            color:${props.theme.colors.mainColor};
            border:1px solid ${props.theme.colors.mainTextColor};
            margin-right:20px;
            &:hover{
                background:inherit;
                color:${props.theme.colors.mainTextColor};
            };
        `
    :
        `   
            background:inherit;
            border:1px solid ${props.theme.colors.mainTextColor};
            color:${props.theme.colors.mainTextColor};
            &:hover{
                color:${props.theme.colors.mainColor};
                background:${ props.theme.colors.mainTextColor};
            }
        `
    };
`
 function TestInfo({testInfo,changeId}){
    const [quests,setQuests] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        GetQuests(testInfo.testId).then(res=>setQuests(res.data.quests))
    },[testInfo])

    if( testInfo.testId==='' || testInfo.testId === null ){
        return(
        <Info>
            <Text>please select test or <ThisLink to='/create-quiz'>create Test now</ThisLink></Text>
        </Info>
        )
    }

    const DeletQuest = async (questId) =>{
        await axios.post('/api/delete/quest',{questId})
        changeId('','')
    }

    const DeleteTest = async (testId) =>{
        await axios.post('/api/delete/test',{testId})
        changeId('','')
        GetTests(dispatch)
    }
    return(
        <Info>
            <Text>{testInfo.text}</Text>
        <TestsComponent br>
           <NewTitle>Quests for this test was {quests.length}</NewTitle>
            <Container>
            {quests.map((e, index)=>{
                return (
                    <TestComponent text key={index}>
                        <ThisSubTitle mb text><ThisSubTitleBold>Title:</ThisSubTitleBold> {e.title}</ThisSubTitle>
                        <ThisSubTitle mb text><ThisSubTitleBold>Quest:</ThisSubTitleBold> {e.quest}</ThisSubTitle>
                        {e.ansvers[0].ansver===''?null:<ThisSubTitle mb text><ThisSubTitleBold>Answer 1:</ThisSubTitleBold> {e.ansvers[0].ansver}</ThisSubTitle>}
                        {e.ansvers[1].ansver===''?null:<ThisSubTitle mb text><ThisSubTitleBold>Answer 2:</ThisSubTitleBold> {e.ansvers[1].ansver}</ThisSubTitle>}
                        {e.ansvers[2].ansver===''?null:<ThisSubTitle mb text><ThisSubTitleBold>Answer 3:</ThisSubTitleBold> {e.ansvers[2].ansver}</ThisSubTitle>}
                        {e.ansvers[3].ansver===''?null:<ThisSubTitle mb text><ThisSubTitleBold>Answer 4:</ThisSubTitleBold> {e.ansvers[3].ansver}</ThisSubTitle>}
                        <ThisSubTitle mb text><ThisSubTitleBold>True ansver:</ThisSubTitleBold> {e.trueAnsver}</ThisSubTitle>
                       <Infos> <QueryButton  to={`change/${e._id}`} query='true' >Change</QueryButton><QueryButton to='#' onClick={()=>DeletQuest(e._id)}>Delete</QueryButton></Infos>
                    </TestComponent>
                )
            })}
        </Container>
                    <Infos mb text><ButtonAdd to={`/AddQuize/${testInfo.testId}`} mr='true'>Add Quest</ButtonAdd><ButtonAdd to='#' onClick={()=>DeleteTest(testInfo.testId)}>Delete Test</ButtonAdd></Infos>
        </TestsComponent>
        <TestAnsvers testId={testInfo.testId}/>
        </Info>
    )
}

export default memo(TestInfo)