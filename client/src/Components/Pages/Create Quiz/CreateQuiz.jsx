import React from 'react'
import { Container } from '../../../styles/styles'
import Header from '../../Main-Components/Header'

export default function CreateQuiz() {
    return (
        <div>
            <Container>
                <Header page="create-quiz" auth />
                CreateQuiz
            </Container>
        </div>
    )
}
