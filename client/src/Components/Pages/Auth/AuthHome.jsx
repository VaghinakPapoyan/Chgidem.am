import Header from "../../Main-Components/Header";
import { Container } from "../../../styles/styles.js"

const HomeContainer = Container;

export function AuthHome(){
    return(
        <HomeContainer>
            <Header auth />
        </HomeContainer>
    )
}