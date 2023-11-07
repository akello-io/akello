import React, {useRef, useState} from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {Amplify, Auth} from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import {cognito_auth_components, cognito_auth_formFields} from "./cognito_auth";
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from "react-router";
import AppLogo from '../src/images/logos/akello/akello-white-logo.png'
import { AppSidebarLayout } from '@akello/react'
import HomePage from './pages/HomePage';
import Login from "./pages/Login";


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
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />}/>
                    <Route path={"/login"} element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
