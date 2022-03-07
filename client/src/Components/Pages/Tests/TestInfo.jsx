import { useState } from "react"
import { useEffect } from "react"
import { memo } from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"
import { GetQuests } from "../../../hooks/useTest"


const Info = styled.div`
    margin-left:20px;
    padding-top:20px;
`
const Text = styled.p`
    margin-bottom:10px;
    font-size:18px;
    font-weight:600;
`
const Tabel = styled.div`
    
`
const Tr = styled.div`
    display:flex;

`

 function TestInfo({testInfo}){
    const [quests,setQuests] = useState([])
    useEffect(()=>{
        GetQuests(testInfo.testId).then(res=>setQuests(res.data))
    },[])
    console.log(quests)

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
        </Info>
    )
}

export default memo(TestInfo)