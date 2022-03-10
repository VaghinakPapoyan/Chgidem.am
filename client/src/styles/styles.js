import styled from "styled-components";

export const Container = styled.div`
    width: 95%;
    max-width: 1140px;
    margin: 0px auto;
    display:${props=>props.flex?'flex':""};
`