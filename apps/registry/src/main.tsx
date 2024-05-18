import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Authenticator } from '@aws-amplify/ui-react';
import { AkelloProvider } from '@akello/react-hook'
import { akello } from './client.ts'
import { BrowserRouter } from 'react-router-dom';


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
