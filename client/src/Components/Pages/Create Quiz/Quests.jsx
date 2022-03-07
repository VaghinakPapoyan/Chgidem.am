import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Container } from "../../../styles/styles";
import { MyButton, SubTitle, TestComponent } from "../Auth/components/Test";
import { NewTitle, TestsComponent } from "../Auth/components/Tests";
import Title from "../Auth/components/Title";

export function Quests(){
    const quests = useSelector(state=>state.quests)
    const [display,setDisplay] = useState(false)
    const dispatch = useDispatch()
    const clickQuest = (id) =>{
        console.log(id)
        dispatch({
            type:"deletequest",
            id
        })
    }

   useEffect(()=>{
    if(quests.length == 0){
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
                        {e.ansvers[0].ansver==''?null:<SubTitle mb text>asnver 1:   {e.ansvers[0].ansver}</SubTitle>}
                        {e.ansvers[1].ansver==''?null:<SubTitle mb text>asnver 2:   {e.ansvers[1].ansver}</SubTitle>}
                        {e.ansvers[2].ansver==''?null:<SubTitle mb text>asnver 3:   {e.ansvers[2].ansver}</SubTitle>}
                        {e.ansvers[3].ansver==''?null:<SubTitle mb text>asnver 3:   {e.ansvers[3].ansver}</SubTitle>}
                        <SubTitle mb text>TrueAnsver:{e.ansvers[0].checked?' ansver1':''}{e.ansvers[1].checked?' ansver2':''}{e.ansvers[2].checked?' ansver3':''}{e.ansvers[3].checked?' ansver4':''}</SubTitle>
                        <MyButton to='/questions' onClick={()=>clickQuest(quests.findIndex(i=>i==e))}>Delete Quest</MyButton>
                    </TestComponent>
                )
            })}
        </Container>
       </TestsComponent>
    )
}