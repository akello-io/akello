import './index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AkelloProvider } from '@akello/react-hook'
import { akello } from './client.ts'
import { rem, createTheme, MantineProvider} from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';


const theme = createTheme({
  colors: {
    
  },

  shadows: {    
  },

  fontFamily: 'Work Sans',

  
  headings: {    
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>    
    <BrowserRouter>
      <MantineProvider theme={theme} >
        <Notifications />
        <AkelloProvider akello={akello}>
          <App />
        </AkelloProvider>          
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)