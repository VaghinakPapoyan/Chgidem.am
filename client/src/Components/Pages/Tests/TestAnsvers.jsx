import axios from "axios";
import { memo, useEffect, useState } from "react";

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
                <div>
                    {ansvers.map( (e) => {
                        return(
                            <div key={e._id}>
                                {e.userName}
                                <br />
                                score:{e.score}
                            </div>
                        )   
                    })}  
                </div>
                

            }
        </div>
    )
}

export default memo(TestAnsvers)