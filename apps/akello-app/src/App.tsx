import React, {ReactNode} from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import {BrowserRouter, Navigate, Routes} from "react-router-dom";
import {Route} from "react-router";
import HomePage from './containers/pages/HomePage';
import Login from "./containers/pages/public/Login";
import {Provider, useSelector} from "react-redux";
import {RootState, store} from "./store";
import DashboardPage from "./containers/pages/protected/DashboardPage";
import RegistryPage from "./containers/pages/protected/RegistryPage";
import RegistryCreate from "./containers/pages/protected/RegistryCreate";
import TeamPage from "./containers/pages/protected/TeamPage";


Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_TEST_AWS_REGION,
    userPoolId: process.env.REACT_APP_TEST_AWS_COGNITO_USERPOOL_ID,
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
                        <Route path={'/team'} element={<TeamPage />} />
                        <Route path={'/registry'} element={<RegistryPage />} />
                        <Route path={'/registry/create'} element={<RegistryCreate />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
