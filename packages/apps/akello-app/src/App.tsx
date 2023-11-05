import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {Amplify, Auth} from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import {cognito_auth_components, cognito_auth_formFields} from "./cognito_auth";


Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_TEST_AWS_REGION,
    userPoolId: process.env.REACT_APP_TEST_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_TEST_AWS_COGNITO_USER_POOL_APP_CLIENT_ID
  }
})

function App() {
  return (
    <div>
      <Authenticator formFields={cognito_auth_formFields} components={cognito_auth_components} hideSignUp={false}>
          {({ signOut, user }) => {
              return (
                  <>
                      <button onClick={signOut}>signout</button>
                      Logged In
                  </>
              )
          }}
      </Authenticator>
    </div>
  );
}

export default App;
