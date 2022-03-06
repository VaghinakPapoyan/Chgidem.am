import React from 'react'
import styled from 'styled-components'

export const TitleComponent = styled.h2` 
    font-size: 38px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.secondTextColor};
    text-align: center;
`

export default function Title({ children }) {
  return (
    <TitleComponent>{ children }</TitleComponent>
  )
}
