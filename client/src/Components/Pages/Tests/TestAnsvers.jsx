import axios from "axios";
import { memo, useEffect, useState } from "react";
import { Container } from "../../../styles/styles";
import styled from "styled-components";

const Tr = styled.div`
    width:100%;
    display:flex;
    padding:15px 20px;
    align-items:center;
    background:${({ theme })=>theme.colors.mainTextColor};
    margin-bottom:20px;
    border-radius:20px;
`
const Table = styled.div`
    margin-top:50px;
    width:100%;
`
const Pol = styled.div`
    min-width:30%;
    color:${({ theme })=>theme.colors.mainColor};
    font-size:18px;
    font-weight:600;
`
const MinPol = styled.div`
    color:${({ theme })=>theme.colors.mainColor};
    font-size:18px;
    font-weight:600;
    min-width:20%;
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
                        <Tr>
                            <MinPol>#</MinPol>
                            <Pol>Name</Pol>
                            <Pol>NickName</Pol>
                            <MinPol>Score</MinPol>
                        </Tr>
                         {ansvers.map( (e) => {
                            return(
                                <Tr key={e._id}>
                                    <MinPol>{ansvers.indexOf(e)+1}</MinPol>
                                    <Pol>{e.userName}</Pol>
                                    <Pol>{e.nickName ? e.nickName : '-'}</Pol>
                                    <MinPol>{e.score}</MinPol>
                                </Tr>
                            )   
                        })}  
                    </Table>
                // <div>
                //     {ansvers.map( (e) => {
                //         return(
                //             <div key={e._id}>
                //                 {e.userName}
                //                 <br />
                //                 score:{e.score}
                //             </div>
                //         )   
                //     })}  
                // </div>
                

            }
        </div>
    )
}

export default memo(TestAnsvers)