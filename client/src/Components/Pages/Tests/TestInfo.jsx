import { useState } from "react"
import { useEffect } from "react"
import { memo } from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"
import { GetQuests } from "../../../hooks/useTest"
import { Container } from "../../../styles/styles";
import {  SubTitle, TestComponent } from "../Auth/components/Test";
import { NewTitle, TestsComponent } from "../Auth/components/Tests";

const Info = styled.div`
    margin-left:20px;
    padding-top:20px;
    width:100%;
`
const Text = styled.p`
    margin-bottom:10px;
    font-size:18px;
    font-weight:600;
    margin-bottom:20px;
`
const ButtonAdd = styled.button`
    padding:10px 15px;
    font-size: 1rem;
    border-radius: 6px;
    font-weight: 600;
    margin-top: 15px;
    background:inherit;
    color:${({ theme }) => theme.colors.mainColor};
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    cursor:pointer;
    transition:0.3s;
    &:hover{
        background:${({ theme }) => theme.colors.mainColor};
        color:${({ theme }) => theme.colors.secondColor};
    }
`
const Infos = styled.div`
    display:flex;
`

const QueryButton  = styled.button`
    padding:10px 15px;
    border-radius:3px;
    background:inherit;
    font-size:14px;
    transition:0.3s;
    margin-top:5px;
    ${props=>
    props.query
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
 function TestInfo({testInfo}){
    const [quests,setQuests] = useState([])
    useEffect(()=>{
        GetQuests(testInfo.testId).then(res=>setQuests(res.data.quests))
    },[testInfo])
    if(testInfo.testId===''){
        return(
        <Info>
            <Text>please select test or <Link to='/create-quiz'>create Test now</Link></Text>
        </Info>
        )
    }
    return(
        <Info>
            <Text>{testInfo.text}</Text>
        <TestsComponent br>
           <NewTitle>Quests for this test was {quests.length}</NewTitle>
            <Container>
            {quests.map((e)=>{
                return (
                    <TestComponent text key={Math.random()}>
                        <SubTitle mb text>Title : {e.title}</SubTitle>
                        <SubTitle mb text>quest : {e.quest}</SubTitle>
                        {e.ansvers[0].ansver===''?null:<SubTitle mb text>asnver 1:   {e.ansvers[0].ansver}</SubTitle>}
                        {e.ansvers[1].ansver===''?null:<SubTitle mb text>asnver 2:   {e.ansvers[1].ansver}</SubTitle>}
                        {e.ansvers[2].ansver===''?null:<SubTitle mb text>asnver 3:   {e.ansvers[2].ansver}</SubTitle>}
                        {e.ansvers[3].ansver===''?null:<SubTitle mb text>asnver 4:   {e.ansvers[3].ansver}</SubTitle>}
                        <SubTitle mb text>TrueAnsver:{e.trueAnsver}</SubTitle>
                       <Infos> <QueryButton query>Change</QueryButton><QueryButton >Delete</QueryButton></Infos>
                    </TestComponent>
                )
            })}
        </Container>
        <Infos mb text>  <ButtonAdd >Add Quest</ButtonAdd></Infos>
       </TestsComponent>
        </Info>
    )
}

export default memo(TestInfo)