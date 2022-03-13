import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {  questAdd } from "../../../hooks/useTest";
import { Container } from "../../../styles/styles";
import { MyButton, SubTitle, TestComponent } from "../Auth/components/Test";
import { NewTitle, TestsComponent } from "../Auth/components/Tests";


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
const Info = styled.div`
   
`
export const ThisSubTitle = styled(SubTitle)`
    margin-top: 5px;
    margin-bottom: 10px;
`
export const ThisSubTitleBold = styled.span`
    font-weight: 600;
`
const MyTestsComponent = styled(TestsComponent)`
    & > div{
        padding-bottom:0px  !important;
    }
`
const MyTitle = styled(NewTitle)`
    font-size:16px !important;
    padding:20px 0px !important;
`
export function Quests({isAdd,testId}){
    const quests = useSelector(state=>state.quests)
    const [display,setDisplay] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate('')

    const clickQuest = (id) =>{
        dispatch({
            type:"deletequest",
            id
        })
    }

   useEffect(()=>{
    if(quests.length === 0){
        setDisplay(false)
    }else{
        setDisplay(true)
    }
    })

    
    return (
       <MyTestsComponent displayI={display?"block":"none"}>
           <NewTitle>Quests for this test was {quests.length}</NewTitle>
            <Container>
            {quests.map((e)=>{
                return (
                    <TestComponent text key={Math.random()}>
                        <ThisSubTitle mb text><ThisSubTitleBold>Title:</ThisSubTitleBold> {e.title}</ThisSubTitle>
                        <ThisSubTitle mb text><ThisSubTitleBold>Quest:</ThisSubTitleBold> {e.quest}</ThisSubTitle>
                        {e.ansvers[0].ansver===''?null:<ThisSubTitle mb text><ThisSubTitleBold>Asnwer 1:</ThisSubTitleBold> {e.ansvers[0].ansver}</ThisSubTitle>}
                        {e.ansvers[1].ansver===''?null:<ThisSubTitle mb text><ThisSubTitleBold>Asnwer 2:</ThisSubTitleBold> {e.ansvers[1].ansver}</ThisSubTitle>}
                        {e.ansvers[2].ansver===''?null:<ThisSubTitle mb text><ThisSubTitleBold>Asnwer 3:</ThisSubTitleBold> {e.ansvers[2].ansver}</ThisSubTitle>}
                        {e.ansvers[3].ansver===''?null:<ThisSubTitle mb text><ThisSubTitleBold>Asnwer 4:</ThisSubTitleBold> {e.ansvers[3].ansver}</ThisSubTitle>}
                        <ThisSubTitle mb text><ThisSubTitleBold>True ansver:</ThisSubTitleBold> {e.trueAnsver}</ThisSubTitle>
                        <MyButton to='/questions' onClick={()=>clickQuest(quests.findIndex(i=>i===e))}>Delete Quest</MyButton>
        </TestComponent>
                )
            })}
        </Container>
        <Info mb text> {quests.length >=2  || isAdd ? <ButtonAdd onClick={()=>{questAdd(quests,dispatch,navigate,testId)}}>Add Test</ButtonAdd>:<MyTitle>Minimum quests was 2</MyTitle>}</Info>
       </MyTestsComponent>
    )
}