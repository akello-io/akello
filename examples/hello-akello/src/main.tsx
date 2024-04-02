import './index.css'
import '@mantine/core/styles.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { AkelloProvider } from '@akello/react-hook'
import { akello } from './client.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <AkelloProvider akello={akello}>
          <App />
        </AkelloProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
