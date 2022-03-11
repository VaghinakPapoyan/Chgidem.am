import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../../../styles/styles'

const ThisAnswer = styled.div` 
    width: 100%;
    padding: 40px 20px;
    background-color: ${({ theme }) => theme.colors.thirdColor};
`
const ThisTitle = styled.h2` 
    font-size: 38px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainTextColor};
    text-align: center;
`

export default function Answer() {
    const { id } = useParams()
    useEffect(() => 
    {
        axios.get("get-test", { params: { id } })
    }, [])
    return (
        <Container>
            <ThisAnswer>
                <ThisTitle></ThisTitle>
            </ThisAnswer>
        </Container>
    )
}
