import axios from "axios";
import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Tr = styled.div`
    width:100%;
    display:flex;
    padding:15px 20px;
    align-items:center;
    background:${({ theme })=>theme.colors.mainTextColor};
    margin-bottom:20px;
    border-radius:20px;
    cursor: pointer;
    transition: 0.4s;
    &:hover
    {
        filter: brightness(0.7);
    }
`
const Th = styled.div`
    width:100%;
    display:flex;
    padding:15px 20px;
    align-items:center;
    background:${({ theme })=>theme.colors.mainTextColor};
    margin-bottom:20px;
    border-radius:20px;
    border: 3px solid ${({ theme }) => theme.colors.thirdTextColor};
    & > div
    {
        font-weight: 600;
    }
`
const Table = styled.div`
    margin-top:50px;
    width:100%;
`
const Pol = styled.div`
    min-width: 37.5%;
    font-weight: 500;
    font-size: 18px;
    color:${({ theme })=>theme.colors.mainColor};
`
const MinPol = styled.div`
    color:${({ theme })=>theme.colors.mainColor};
    font-size:18px;
    font-weight: 500;
    min-width:${props=>props.id?'7%':'11%'};
`
const Title = styled.div`
    text-align:center;
    color:${({ theme })=>theme.colors.mainTextColor};
    margin-bottom:20px;
    font-size:24px;
    font-weight:600;
`
function TestAnsvers( { testId } ){

    const [ansvers,setAnsvers] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        async function Fetch(){
            await axios.post('/api/get/ansvers',{testId})
            .then(result => {
                setAnsvers(result.data.ansvers)
                setLoading(false)
            })
        }
        if(testId){
            Fetch()
        }
    },[testId])   

    const navigateInfo = (userId) => {
        navigate(`/answer/info/${testId}/${userId}`)
    }
    
    return(
        <div>
            {
                loading || !testId
                ?
                <div></div>
                :
                    <Table>
                        <Title>
                            Answers
                        </Title>
                        <Th title="true">
                            <MinPol id="true" >#</MinPol>
                            <Pol >Name</Pol>
                            <Pol >NickName</Pol>
                            <MinPol >Score</MinPol>
                        </Th>
                         {ansvers.map( (e) => {
                            return(
                                <Tr key={e._id} onClick={()=>navigateInfo(e._id, e.userId)}>
                                    <MinPol id='true'>{ansvers.indexOf(e)+1}</MinPol>
                                    <Pol>{e.userName}</Pol>
                                    <Pol>{e.nickName ? e.nickName : '-'}</Pol>
                                    <MinPol>{e.score}</MinPol>
                                </Tr>
                            )   
                        })}  
                    </Table>
            }
        </div>
    )
}

export default memo(TestAnsvers)