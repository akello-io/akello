import '@mantine/core/styles.css';

import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';
import {store} from "./store";
import {Provider} from 'react-redux'
import {AkelloProvider} from '@akello/react-hook'
import {AkelloClient} from '@akello/core'
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';

if(process.env.NODE_ENV=='production') {
    try {
        //TODO: move to config file
        const config: AwsRumConfig = {
            sessionSampleRate: 1,
            guestRoleArn: "arn:aws:iam::440667844220:role/RUM-Monitor-us-east-1-440667844220-3016301026961-Unauth",
            identityPoolId: "us-east-1:c4972a0c-5ee4-4d64-ad5b-97d707499ef8",
            endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
            telemetries: ["performance","errors","http"],
            allowCookies: true,
            enableXRay: false
        };

        const APPLICATION_ID: string = 'cf2f9201-ebd7-4e24-bccb-bda992c2d568';
        const APPLICATION_VERSION: string = '1.0.0';
        const APPLICATION_REGION: string = 'us-east-1';

        const awsRum: AwsRum = new AwsRum(
            APPLICATION_ID,
            APPLICATION_VERSION,
            APPLICATION_REGION,
            config
        );
    } catch (error) {
        // Ignore errors thrown during CloudWatch RUM web client initialization
    }
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const akello = new AkelloClient({
    baseUrl: process.env.REACT_APP_API,
    cognitoUserPoolId: process.env.REACT_APP_AWS_COGNITO_USERPOOL_ID,
    cognitoClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
            ...(process.env.REACT_APP_AKELLO_COGNITO_LOCAL === "TRUE" && {
                cognitoEndpoint: process.env.REACT_APP_AKELLO_COGNITO_URL,
                authenticationFlowType: "USER_PASSWORD_AUTH",
    }),
    onUnauthenticated: () => {
        window.location.href = '/login'
    }
})

const theme = createTheme({
    primaryColor: 'teal',
    primaryShade: 8,
    fontSizes: {
      xs: '0.6875rem',
      sm: '0.875rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
    },
    components: {
      Container: {
        defaultProps: {
          size: 1200,
        },
      },
    },
  });


root.render(
    <BrowserRouter>
        <Provider store={store}>            
                <AkelloProvider akello={akello}>
                    <App />
                </AkelloProvider>                                  
        </Provider>      
    </BrowserRouter>    
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
