import React, {ReactNode} from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {Amplify, Auth} from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import {BrowserRouter, Navigate, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Route} from "react-router";
import {cognito_auth_components, cognito_auth_formFields} from "./cognito_auth";
import {Provider, useSelector} from "react-redux";
import {RootState, store} from "./store";
import LandingPage from "./containers/pages/public/LandingPage";
import DashboardPage from "./containers/pages/protected/DashboardPage";
import RegistryPage from "./containers/pages/protected/RegistryPage";
import RegistryCreate from "./containers/pages/protected/RegistryCreate";
import TeamPage from "./containers/pages/protected/TeamPage";
import { setAuthToken } from './reducers/appSlice';
import RegistrySelectionPage from './containers/pages/protected/RegistrySelectionPage';




// Configure Amplify in index file or root file

if(process.env.REACT_APP_MOCK != 'true') {
    console.log(process.env)
    Amplify.configure({
        Auth: {
            region: process.env.REACT_APP_AWS_REGION,
            userPoolId: process.env.REACT_APP_AWS_COGNITO_USERPOOL_ID,
            userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
            ...(process.env.REACT_APP_AKELLO_COGNITO_LOCAL === "TRUE" && {
                endpoint: process.env.REACT_APP_AKELLO_COGNITO_URL,
                authenticationFlowType: "USER_PASSWORD_AUTH",
              })
            }
    })
}


const routes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                <Route path={'/dashboard'} element={<DashboardPage />} />
                        <Route path={'/'} element={<RegistrySelectionPage />} />
                        <Route path={'/team'} element={<TeamPage />} />
                        <Route path={'/registry'} element={<RegistryPage />} />
                        <Route path={'/registry/create'} element={<RegistryCreate />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

function App() {
    const dispatch = useDispatch()

    if(process.env.REACT_APP_MOCK == 'true') {
        dispatch(setAuthToken('mock-token'))
        return routes()
    }
    else {
        return (
            <>
                <Authenticator formFields={cognito_auth_formFields} components={cognito_auth_components} hideSignUp={false}>
                    {({ signOut, user }) => {
                        Auth.currentSession().then((session) => {
                            let token = session.getIdToken().getJwtToken()
                            dispatch(setAuthToken(token))
                        }).catch((resp) => {
                            if(signOut) {
                                signOut()
                            }
                        })
                        return routes()
                    }}
                </Authenticator>
            </>

        );
    }
}



export default App;
