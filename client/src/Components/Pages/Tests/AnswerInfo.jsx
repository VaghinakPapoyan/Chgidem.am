import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Load } from "../EditProfile/EditProfile"
import { Results, Result, ResultTitleText, TrueAnswer, FalseAnswer, ResultAnswers, ThisAnswer, ResultTitle, ColorYellow, ResultSubTitle } from "../answer/Answer"
import { Container } from "../../../styles/styles"

export function AnswerInfo(){
    const params = useParams()
    const [answers, setAnswers] = useState([])
    const [score, setScore] = useState([])
    const [username, setUsername] = useState([])
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => 
    {
        setLoading(true)
        axios.get(`/api/get-answers/${params.id}/${params.userId}`).then(res => { setAnswers(res?.data?.answers); setQuestions(res?.data?.questions); setScore(res?.data?.score); setUsername(res?.data?.username)})
        setLoading(false)
    }, [])
    return(
        <Container>
            <ThisAnswer>
            <ResultTitle>
                {username} answered correct to <ColorYellow>{score}</ColorYellow> questions out of <ColorYellow>{answers.length}</ColorYellow>
            </ResultTitle>
            <ResultSubTitle>
                The <ColorYellow>{ Math.floor(score / answers.length * 100) }%</ColorYellow> of {username}'s answers is correct
            </ResultSubTitle>
            {
                loading
                ?
                <Load />
                :
                <Results>
                {
                    answers.length && questions.length
                    ?
                    answers.map((quest, index) => 
                    {
                        return(
                            <Result key={index}>
                                <ResultTitleText>
                                    {index + 1}. {questions[index].quest}
                                </ResultTitleText>
                                <ResultAnswers>
                                    <TrueAnswer>{ questions[index].ansvers[Number(questions[index].trueAnsver) - 1].ansver }</TrueAnswer>
                                    {
                                        !quest.isTrue 
                                        ? 
                                        <FalseAnswer>{ questions[index].ansvers[quest.answer - 1].ansver }</FalseAnswer>
                                        : null
                                    }
                                </ResultAnswers>
                            </Result>
                        )
                    })
                    :
                    null
                }
                </Results>
            }
            </ThisAnswer>
        </Container>
    )
}