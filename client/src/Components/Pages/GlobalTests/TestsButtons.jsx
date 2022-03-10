import { TestsFlex } from "./Global";
import styled from "styled-components";
import axios from "axios";

const ChangeButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    border:1px solid ${({theme})=>theme.colors.mainTextColor};
    color:${({theme})=>theme.colors.mainTextColor};
    font-size:16px;
    width:35px;
    height:35px;
    margin-right:10px;
    cursor:pointer;
    background:inherit;
    padding:0px;
    border-radius:3px;
    transition:0.3s;
    &:hover{
        background:${({theme})=>theme.colors.mainTextColor};
        color:${({theme})=>theme.colors.mainColor};
    }
`
export default function TestsButtons({setData,length}){

    const CheckUpdates = async (e) => {
        const data = await axios.post('/api/get/checked',{e})
        setData(data.data.tests)
    }
    return(
        <TestsFlex mt>
            {length.map((e)=>{
                return(
                    <ChangeButton key={e} onClick={()=>CheckUpdates(e)}>{e}</ChangeButton>
                )
            })}
        </TestsFlex>
    )
}