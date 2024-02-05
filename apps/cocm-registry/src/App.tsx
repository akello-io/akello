import {Amplify, Auth} from 'aws-amplify';
import React, {Suspense, ReactNode, useEffect} from 'react';
import '@aws-amplify/ui-react/styles.css';
import {BrowserRouter, Routes} from "react-router-dom";
import {Route, useNavigate} from "react-router";
import FinancialModelList from "./apps/financial-model/FinancialModelList";
import {FinancialModelDetail} from "./apps/financial-model/FinancialModelDetail";
import FinancialModelCreate from "./apps/financial-model/FinancialModelCreate";
import RegistryComponent from "./apps/registry/RegistryComponent";
import UpgradeComponent from "./apps/upgrade/UpgradeComponent";
import {AkelloProvider, useAkello} from '@akello/react-hook'
import {AkelloClient} from '@akello/core'
import TeamComponent from "./apps/team/TeamComponent";
import Dashboard from "./apps/dashboard/Dashboard";
import CalendarComponent from "./apps/calendar/CalendarComponent";
import MessagesComponent from "./apps/messages/MessagesComponent";
import RegistrySelector from "./apps/registry_list/RegistrySelector";
import ReportsComponent from "./apps/reports/ReportsComponent";
import RegistryCreate from "./apps/registry-create/RegistryCreate";
import ProfileComponent from "./apps/profile/ProfileComponent";
import BillingReport from "./apps/reports/billing/BillingReport";
import RegistryReport from "./apps/reports/registry/RegistryReport";
import "./App.css"
import AkelloSignIn from './apps/auth/AkelloSignIn';

// Configure Amplify in index file or root file

/*
if(process.env.REACT_APP_MOCK != 'true') {
    console.log(process.env)    
    Amplify.configure({
        Auth: {
            region: process.env.REACT_APP_AWS_REGION,
            userPoolId: process.env.REACT_APP_AWS_COGNITO_USERPOOL_ID,
            userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
            ...(process.env.REACT_APP_AKELLO_COGNITO_LOCAL === "TRUE" && {
                endpoint: process.env.REACT_APP_AKELLO_COGNITO_URL,
                authenticationFlowType: "USER_PASSWORD_AUTH",
              })
            }
    })
}
 */

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



function App() {    
        
    return (
        <>
            <BrowserRouter>                        
                <AkelloProvider akello={akello}>                                        
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>                        
                            <Route path={"/"} element={<RegistrySelector />} />
                            <Route path={"/login"} element={<AkelloSignIn />} />
                            <Route path={"/profile"} element={<ProfileComponent />} />
                            <Route path={"/registry/create"} element={<RegistryCreate />} />
                            <Route path={"/dashboard"} element={<Dashboard />} />
                            <Route path={"/calendar"} element={<CalendarComponent />} />
                            <Route path={"/messages"} element={<MessagesComponent />} />
                            <Route path={"/health"} element={<Dashboard />} />
                            <Route path={"/team"} element={<TeamComponent />} />
                            <Route path={"/reports"} element={<ReportsComponent />} />
                            <Route path={"/reports/billing"} element={<BillingReport />} />
                            <Route path={"/reports/registry"} element={<RegistryReport />} />
                            <Route path={"/registry"} element={<RegistryComponent />} />
                            <Route path={"/model"} element={<FinancialModelDetail />} />
                            <Route path={"/models"} element={<FinancialModelList />} />
                            <Route path={"/models/create"} element={<FinancialModelCreate />} />
                            <Route path={"/models/:model_name"} element={<FinancialModelDetail />} />
                            <Route path={"/upgrade"} element={<UpgradeComponent />} />                                        
                        </Routes>     
                    </Suspense>
                </AkelloProvider>                                     
            </BrowserRouter>
            
        </>

    );
}

export default App;