import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../../../styles/styles'
import { Load } from '../EditProfile/EditProfile'

const ThisAnswerTitle = styled.div` 
    width: 100%;
    padding: 60px 0px;
`
const AnsverOne = styled.p`
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: ${({ theme }) => theme.colors.mainTextColor};
    border-bottom: 5px solid ${({ theme }) => theme.colors.thirdTextColor};
    font-size: 16px;
    font-weight: 600;
    padding-top: 12px;
    padding-bottom: 7px;
    margin-top: 30px;
    cursor: pointer;
    text-align: center;
    width: 46%;
    transition: 0.4s;
    &:hover
    {
        background-color: ${({ theme }) => theme.colors.thirdColor};
        color: ${({ theme }) => theme.colors.secondTextColor}; 
    }
    &:first-child
    {
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border-left: 5px solid ${({ theme }) => theme.colors.thirdColor};
    }
    &:last-child
    {
        border-top-left-radius: 50px;
        border-right: 5px solid ${({ theme }) => theme.colors.thirdColor};
        border-bottom-left-radius: 50px;
        margin-left: 50px;
    }
    ${({ active }) => active ? "background-color: #32a852 !important; color: white;" : null}
` 
const Answers = styled.div` 
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ThisAnswer = styled.div` 
    width: 100%;
    padding: 50px;
    text-align: start;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.secondColor};
`
const ThisTitle = styled.h2` 
    font-size: 38px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainTextColor};
    text-align: center;
`
const ThisText = styled.h4` 
    font-size: 18px;
    width: 320px;
    margin: 0px auto;
    font-weight: 500;
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.mainTextColor};
    text-align: center;
`
const Title = styled.div` 
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`
const TitleText = styled.h4` 
    color: ${({ theme }) => theme.colors.secondTextColor};
    font-weight: 600;
    font-size: 18px;
`
const Count = styled.i` 
    text-decoration: none;
    display: block;
    font-weight: 600;
    padding-left: 15px;
    color: ${({ theme }) => theme.colors.secondTextColor};
    letter-spacing: 1;
`
const ThisButton = styled.button`
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: ${({ theme }) => theme.colors.mainTextColor};
    font-weight: 600;
    border: 0;
    outline: none !important;
    padding: 10px 30px;
    position: relative;
    border-bottom: 5px solid ${({ theme }) => theme.colors.thirdTextColor};
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 30px;
    font-size: 16px;
    text-align: left;
    &:before
    {
        content: "";
        width: 0px;
        height: 0px;
        opacity: 0.15;
        position: absolute;
        left: 50%;
        pointer-events: none;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        transition: 0.4s;
        z-index: 2;
        background-color: ${props => props.theme.colors.secondColor};
    }
    &:hover:before
    {
        width: 120px;
        height: 120px;
    }
`
const ColorYellow = styled.span` 
    color: ${({ theme }) => theme.colors.thirdTextColor};
`
const ResultTitle = styled(TitleText)` 
    font-size: 22px;
    text-align: center;
`
const Results = styled.div`
    margin-top: 45px;
` 
const ResultSubTitle = styled.p` 
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
    color: ${({ theme }) => theme.colors.secondTextColor};
`
const ResultTitleText = styled.h4` 
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.secondTextColor};
`
const Result = styled.div` 
    font-size: 18px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
    font-weight: 400;
    margin-top: 15px;
    color: ${({ theme }) => theme.colors.secondTextColor};
`
const ResultAnswers = styled.div` 
    display: flex;
    align-items: center;
`
const TrueAnswer = styled.div` 
    background-color: #32a852;
    margin-top: 13px;
    border-radius: 8px;
    padding: 7px 15px;
    font-size: 14px;
    display: inline-block;

`
const FalseAnswer = styled(TrueAnswer)` 
    background-color: #ff4242;
    margin-left: 15px;
`
const NewThisButton = styled(Link)` 
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: ${({ theme }) => theme.colors.mainTextColor};
    font-weight: 600;
    border: 0;
    outline: none !important;
    padding: 10px 30px;
    position: relative;
    border-bottom: 5px solid ${({ theme }) => theme.colors.thirdTextColor};
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    text-decoration: none !important;
    margin-top: 30px;
    font-size: 16px;
    text-align: left;
    &:last-child
    {
        margin-left: 30px;
    }
    &:before
    {
        content: "";
        width: 0px;
        height: 0px;
        opacity: 0.15;
        position: absolute;
        left: 50%;
        pointer-events: none;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        transition: 0.4s;
        z-index: 2;
        background-color: ${props => props.theme.colors.secondColor};
    }
    &:hover:before
    {
        width: 120px;
        height: 120px;
    }
    &:hover:before
    {
        width: 200px;
        height: 200px;
    }
`
const Loading = styled(Load)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`


export default function Answer() {
    const { id } = useParams()
    const [ test, setTest ] = useState();
    const [ answers, setAnswers ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ score, setScore ] = useState(0)
    const [ trueAnswer, setTrueAnswer ] = useState(null);
    const token = useSelector(state=>state.token)
    const reply = answerTrue => 
    {
        if(trueAnswer !== null)
        {
            setAnswers([ ...answers, { answer: trueAnswer, isTrue: Number(answerTrue) === Number(trueAnswer) } ])
            setTrueAnswer(null)
        }
    }
    const gameOver = async () => 
    {
        setScore(answers.filter(answer => answer.isTrue === true).length)
        const testId = test.test._id
        await axios.post('/api/set/answers',{ testId, answers, token:token, score:answers.filter(answer => answer.isTrue === true).length })
    }
    useEffect(() => 
    {
        setLoading(true)
        
        axios.get("/api/get-test/" + id).then(res => {setTest(res.data); setLoading(false)})
    }, [])
    useEffect(() => 
    {
        if(Number(answers.length) === Number(test?.quests.length))
        {
            gameOver();
        }
    }, [answers])
    return (
        <>
            {
                !loading
                ?
                <Container>
                    <ThisAnswerTitle>
                        <ThisTitle>{ test?.test?.title }</ThisTitle>
                        <ThisText>{ test?.test?.text }</ThisText>
                    </ThisAnswerTitle>
                    <ThisAnswer>
                        {
                            test?.quests[answers.length]
                            ?
                            <>
                                <Title>
                                    <TitleText>
                                        {answers.length + 1}. { test?.quests[answers.length]?.quest }
                                    </TitleText>
                                    <Count>{answers.length + 1} / { test?.quests.length }</Count>
                                </Title>
                                <Answers>
                                    <AnsverOne active={trueAnswer === 1} onClick={() => setTrueAnswer(1)}>{test?.quests[answers.length]?.ansvers[0].ansver}</AnsverOne>
                                    <AnsverOne active={trueAnswer === 2} onClick={() => setTrueAnswer(2)}>{test?.quests[answers.length]?.ansvers[1].ansver}</AnsverOne>
                                </Answers>
                                <Answers>
                                    <AnsverOne active={trueAnswer === 3} onClick={() => setTrueAnswer(3)}>{test?.quests[answers.length]?.ansvers[2].ansver}</AnsverOne>
                                    <AnsverOne active={trueAnswer === 4} onClick={() => setTrueAnswer(4)}>{test?.quests[answers.length]?.ansvers[3].ansver}</AnsverOne>
                                </Answers>
                                <ThisButton onClick={() => reply(test?.quests[answers.length]?.trueAnsver)}>Reply</ThisButton>
                            </>
                            :
                            <>
                                <ResultTitle>
                                    You have answered correct to <ColorYellow>{score}</ColorYellow> questions out of <ColorYellow>{test?.quests.length}</ColorYellow>
                                </ResultTitle>
                                <ResultSubTitle>
                                    The <ColorYellow>{ Math.floor(score / test?.quests.length * 100) }%</ColorYellow> of your answers is correct
                                </ResultSubTitle>
                                <Results>
                                    {
                                        test?.quests.map((quest, index) => 
                                        {
                                            return(
                                                <Result key={index}>
                                                    <ResultTitleText>
                                                        {index + 1}. {quest.quest}
                                                    </ResultTitleText>
                                                    <ResultAnswers>
                                                        <TrueAnswer>{ quest.ansvers[quest.trueAnsver - 1].ansver }</TrueAnswer>
                                                        {
                                                            !answers[index].isTrue 
                                                            ? 
                                                            <FalseAnswer>{ quest.ansvers[answers[index].answer - 1].ansver }</FalseAnswer>
                                                            : null
                                                        }
                                                    </ResultAnswers>
                                                </Result>
                                            )
                                        })
                                    }
                                </Results>
                                <NewThisButton to="/Tests">Get another test</NewThisButton>
                                <NewThisButton to="/">Go home</NewThisButton>
                            </>
                        }
                    </ThisAnswer>
                </Container>
                :
                <Loading />
            }
        </>
    )
}
