import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../../../styles/styles'

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
    margin-top: 20px;
    cursor: pointer;
    text-align: center;
    width: 42.5%;
    transition: 0.4s;
    border-radius: 50px;
    &:hover
    {
        background-color: ${({ theme }) => theme.colors.thirdColor};
        color: ${({ theme }) => theme.colors.secondTextColor}; 
    }
    &:last-child
    {
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
const Results = styled.p`
    margin-top: 45px;
` 
const ResultSubTitle = styled.p` 
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
    color: ${({ theme }) => theme.colors.secondTextColor};
`
const ResultTitleText = styled.h4` 
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.secondTextColor};
`

export default function Answer() {
    const { id } = useParams()
    const [ test, setTest ] = useState();
    const [ answers, setAnswers ] = useState([]);
    const [ score, setScore ] = useState(0)
    const [ trueAnswer, setTrueAnswer ] = useState(null);
    const reply = answerTrue => 
    {
        if(trueAnswer !== null)
        {
            setAnswers([ ...answers, { answer: trueAnswer, isTrue: Number(answerTrue) === Number(trueAnswer) } ])
            setTrueAnswer(null)
        }
    }
    const gameOver = () => 
    {
        setScore(answers.filter(answer => answer.isTrue === true).length)
    }

    useEffect(() => 
    {
        axios.get("/api/get-test/" + id).then(res => setTest(res.data))
    }, [])
    useEffect(() => 
    {
        if(Number(answers.length) === Number(test?.quests.length))
        {
            gameOver();
        }
    }, [answers])
    return (
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
                                    console.log(quest);
                                    return(
                                    <>
                                        <ResultTitleText>
                                            {index + 1}. {quest.quest}
                                        </ResultTitleText>
                                    </>
                                    )
                                })
                            }
                        </Results>
                    </>
                }
            </ThisAnswer>
        </Container>
    )
}
