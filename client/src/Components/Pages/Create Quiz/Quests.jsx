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
export function Quests(){
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
       <TestsComponent displayI={display?"block":"none"}>
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
                        <MyButton to='/questions' onClick={()=>clickQuest(quests.findIndex(i=>i===e))}>Delete Quest</MyButton>
        </TestComponent>
                )
            })}
        </Container>
        <Info mb text> {quests.length >=2 ? <ButtonAdd onClick={()=>{questAdd(quests,dispatch,navigate)}}>Add Test</ButtonAdd>:<NewTitle >Minimum quests was 2</NewTitle>}</Info>
       </TestsComponent>
    )
}