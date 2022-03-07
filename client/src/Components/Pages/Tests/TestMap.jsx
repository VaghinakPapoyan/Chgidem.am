import { useSelector } from "react-redux"
import styled from "styled-components"

const Tests = styled.div`
    max-width:20%;
    margin-right:10px;
    padding-right:40px;
    border-right: 2px solid ${({ theme }) => theme.colors.mainTextColor};
    border-radius:0px;
`
const Test = styled.div`
    cursor:pointer;
    margin-bottom:${props=>props.mb?props.mb:'0px'};
    padding:10px 0px 10px 10px;
    border-left: 2px solid ${({ theme }) => theme.colors.mainTextColor};
    border-radius:3px;
`
const Title = styled.div`
    font-size:16px;
    margin-bottom:${props=>props.mb?props.mb:'0px'};
    color: ${({ theme }) => theme.colors.mainTextColor};
`
const Ansvers = styled.div`
    display:flex;
    margin-top:10px;
    font-size:14px;
    color: ${({ theme }) => theme.colors.mainTextColor};
`
export function TestMap({changeId}){
    const MyTests = useSelector(state=>state.MyTest)
    return(
        <Tests>
            <Title mb='20px'>Tests` {MyTests.length}</Title>
            {MyTests.map((e)=>{
                return(
                    <Test mb='25px' onClick={()=>changeId(e._id,e.text)} key={e._id}>
                        <Title>{e.title}</Title>
                        <Ansvers>Ansvers : {e.ansvers.length}</Ansvers>
                    </Test>
                )
            })}
        </Tests>
    )
}