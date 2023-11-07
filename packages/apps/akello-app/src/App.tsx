import React, {ReactNode} from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import {BrowserRouter, Navigate, Routes} from "react-router-dom";
import {Route} from "react-router";
import HomePage from './pages/HomePage';
import Login from "./pages/Login";
import {Provider, useSelector} from "react-redux";
import {RootState, store} from "./store";
import DashboardPage from "./pages/DashboardPage";


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
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<HomePage />}/>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={'/dashboard'} element={<DashboardPage />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
