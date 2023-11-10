import PageContainer from "../PageContainer";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LandingPage from "./public/LandingPage";
import RegistrySelectionPage from './protected/RegistrySelectionPage';
import {Auth} from "aws-amplify";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import {setAuthToken} from "../../reducers/appSlice";
import RegistryPage from "./protected/RegistryPage";
import PublicPageContainer from "./public/PublicPageContainer";


interface HomePageProps {
}


const HomePage:React.FC<HomePageProps> = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoaded, setLoaded] = useState(false)
    const dispatch = useDispatch()

    Auth.currentSession().then((session: CognitoUserSession) => {
        setLoggedIn(true)
        setLoaded(true)
        let token = session.getIdToken().getJwtToken()
        dispatch(setAuthToken(token))
    }).catch((err)=> {
        setLoaded(true)
    })

    if(!isLoaded) {
        return <></>
    }

    return (
        <div className={"transition-opacity ease-in duration-700"}>
            {loggedIn && (
                <PublicPageContainer>
                    <RegistrySelectionPage />
                </PublicPageContainer>

            )}
            {!loggedIn && (
                <PublicPageContainer>
                    <LandingPage />
                </PublicPageContainer>
            )}
        </div>
    )
}

export default HomePage