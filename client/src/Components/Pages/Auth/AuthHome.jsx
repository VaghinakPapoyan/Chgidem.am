import Header from "../../Main-Components/Header";
import { Container } from "../../../styles/styles.js"
import Tests from "./components/Tests";

const HomeContainer = Container;

export function AuthHome(){
    return(
        <HomeContainer>
            <Header auth page="home" />
            <Tests />
        </HomeContainer>
    )
}