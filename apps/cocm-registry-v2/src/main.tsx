import '@mantine/core/styles.css';
import './index.css'
import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AkelloProvider } from '@akello/react-hook'
import { akello } from './client'
import { MantineProvider} from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>    
    <BrowserRouter>
      <MantineProvider 
        withGlobalStyles 
        withNormalizeCSS>
        <AkelloProvider akello={akello}>
          <App />
        </AkelloProvider>          
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)