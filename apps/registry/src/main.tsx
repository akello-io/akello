import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Authenticator } from '@aws-amplify/ui-react';
import { AkelloProvider } from '@akello/react-hook'
import { akello } from './client.ts'
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_APP_CLIENT_ID,
      userPoolId: import.meta.env.VITE_AWS_COGNITO_USERPOOL_ID,
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_AWS_COGNITO_OAUTH_DOMAIN,
          providers: ['Google'],
          scopes: ["phone", "email", "profile", "openid"],
          responseType: 'code',
          redirectSignIn: [
            import.meta.env.VITE_AWS_COGNITO_SIGNIN_URL,
          ],
          redirectSignOut: [
            import.meta.env.VITE_AWS_COGNITO_SIGNOUT_URL,
          ],
        },
        email: true,
      }
    }
  }
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <AkelloProvider akello={akello}>
          <Authenticator.Provider>
            <App isPassedToWithAuthenticator={true} />
          </Authenticator.Provider>
        </AkelloProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
