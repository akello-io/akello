import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';
import {store} from "./store";
import {Provider} from 'react-redux'
import {Theme} from "react-daisyui";



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

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
