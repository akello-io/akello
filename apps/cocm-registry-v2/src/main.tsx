import '@mantine/core/styles.css';
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core';
import { AkelloProvider } from '@akello/react-hook'
import { akello } from './client'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>    
    <BrowserRouter>        
      <MantineProvider>
        <AkelloProvider akello={akello}>
          <App />
        </AkelloProvider>      
      </MantineProvider>      
    </BrowserRouter>
  </React.StrictMode>
)