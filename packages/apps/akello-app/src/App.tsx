import React, {useState} from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {Amplify, Auth} from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import {cognito_auth_components, cognito_auth_formFields} from "./cognito_auth";
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from "react-router";
import AppLogo from '../src/images/logos/akello/akello-white-logo.png'

import {HomePage} from '@akello/react';
import {CognitoUserSession} from "amazon-cognito-identity-js";


Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_TEST_AWS_REGION,
    userPoolId: process.env.REACT_APP_TEST_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_TEST_AWS_COGNITO_USER_POOL_APP_CLIENT_ID
  }
})


const routes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes><Route index element={<></>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}


function App() {

    const [token, setToken] = useState('')
    const [first_name, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [profile_photo, setProfilePhoto] = useState('')

      return (
        <div>
          <Authenticator formFields={cognito_auth_formFields} components={cognito_auth_components} hideSignUp={false}>
              {({ signOut, user }) => {

                  Auth.currentSession().then((session: CognitoUserSession) => {
                      setToken(session.getIdToken().getJwtToken())
                      setFirstName(session.getIdToken().payload['given_name'])
                      setEmail(session.getIdToken().payload['email'])
                      setProfilePhoto(session.getIdToken().payload['picture'])
                  }).catch((resp) => {
                      if(signOut) {
                          signOut()
                      }
                  })

                  if(token) {
                      const Home = (<HomePage app_logo={AppLogo} first_name={first_name} email={email} profile_photo={profile_photo} token={token} signOut={signOut}/>)
                      return (
                          <BrowserRouter>
                              <Routes>
                                  <Route index element={Home} />
                              </Routes>
                          </BrowserRouter>
                      )
                  }
                  return <>No token</>
              }}
          </Authenticator>
        </div>
      );
}

export default App;
