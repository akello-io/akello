import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Authenticator } from '@aws-amplify/ui-react';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <App isPassedToWithAuthenticator={true} />
    </Authenticator.Provider>

  </React.StrictMode>,
)
