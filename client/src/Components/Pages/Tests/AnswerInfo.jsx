import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Load } from "../EditProfile/EditProfile"

export function AnswerInfo(){
    const params = useParams()
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(answers);
    useEffect(() => 
    {
        setLoading(true)
        axios.get(`/api/get-answers/${params.id}/${params.userId}`).then(res => setAnswers(res?.data.answers))
        setLoading(false)
    }, [])
    return(
        <>
        {
            loading
            ?
            <Load />
            :
            null
        }
        </>
    )
}