import { useSelector } from "react-redux"
import styled from "styled-components"

const Tests = styled.div`
    max-width:30%;
    margin-right:10px;
    padding-right:40px;
    border-right: 2px solid ${({ theme }) => theme.colors.mainTextColor};
    border-radius:0px;
    @media (max-width: 992px) {
        padding:0px;
        padding-bottom:20px;
        max-width:100%;
        border:none;
        display:flex;
        justify-content:center;
        flex-wrap:wrap;
        border-bottom: 2px solid ${({ theme }) => theme.colors.mainTextColor};
    }
`
const Test = styled.div`
    cursor:pointer;
    margin-bottom:${props=>props.mb?props.mb:'0px'};
    padding:10px 0px 10px 10px;
    transition:0.3s;
    ${props=>props.active === 'active' ? ` border-left: 5px solid ${props.theme.colors.thirdColor};`:`border-left: 5px solid ${props.theme.colors.secondColor};`}
    border-radius:5px;
    min-width:200px;
    @media (max-width: 992px) {
        min-width:150px;
        padding:10px;
        border-radius:10px;
        border:none;
        margin-right:20px;
        ${props=>props.active === 'active' ?`border-bottom:10px solid ${ props.theme.colors.secondColor}`:`border-bottom: 10px solid ${ props.theme.colors.thirdColor }`};
    }
`
const Title = styled.div`
    font-weight:600;
    font-size:16px;
    margin-bottom:${props=>props.mb?props.mb:'0px'};
    color: ${({ theme }) => theme.colors.mainTextColor};
    display:block;
    width:100%;
`
const Ansvers = styled.div`
    display:flex;
    margin-top:10px;
    font-size:14px;
    color: ${({ theme }) => theme.colors.mainTextColor};
`
export function TestMap({changeId,id}){
    const MyTests = useSelector(state=>state.MyTest)
    
    return(
        <Tests>
            <Title mb='20px'>Tests` {MyTests.length}</Title>
            {MyTests.map((e)=>{
                let active = ''
                if(id === e._id){
                    active = 'active'
                }
                return(
                    <Test mb='25px' onClick={()=>changeId(e._id,e.text)} key={e._id} active={active}>
                        <Title>{e.title}</Title>
                        <Ansvers>Ansvers : {e.ansvers.length}</Ansvers>
                    </Test>
                )
            })}
        </Tests>
    )
}