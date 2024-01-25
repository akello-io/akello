import {Amplify, Auth} from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {BrowserRouter, Routes} from "react-router-dom";
import {Route, useNavigate} from "react-router";
import FinancialModelList from "./apps/financial-model/FinancialModelList";
import {FinancialModelDetail} from "./apps/financial-model/FinancialModelDetail";
import FinancialModelCreate from "./apps/financial-model/FinancialModelCreate";
import RegistryComponent from "./apps/registry/RegistryComponent";
import SettingsComponent from "./apps/settings/SettingsComponent";
import UpgradeComponent from "./apps/upgrade/UpgradeComponent";
import {cognito_auth_components, cognito_auth_formFields} from "./cognito_auth";
import {setAuthToken, setSelectedRegistry, setUserProfile} from "./reducers/appSlice";
import {useDispatch} from "react-redux";
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
import {getUser} from "./api/user";
import { debug } from 'console';

// Configure Amplify in index file or root file

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


const routes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<RegistrySelector signOut={() => {}} />} />
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
            </BrowserRouter>
        </>
    )
}

function App() {
    const dispatch = useDispatch()

    if(process.env.REACT_APP_MOCK == 'true') {
        dispatch(setAuthToken('mock-token'))
        return routes()
    }
    else {
        return (
            <>
                <Authenticator formFields={cognito_auth_formFields} components={cognito_auth_components} hideSignUp={false}>
                    {({ signOut, user }) => {
                        Auth.currentSession().then((session) => {

                            let token = session.getIdToken().getJwtToken()

                            dispatch(setAuthToken(token))

                            pendo.initialize({
                                visitor: {
                                    id: session.getIdToken().payload['sub'],
                                    email: user!.attributes!.email,
                                }
                            })

                            getUser(token, (data) => {
                                // just setting user activity and registering any user invites
                                // get-user is not the ideal name here...
                            })

                            let stored_selection = localStorage.getItem("selectedRegistry")
                            if(stored_selection) {
                                dispatch(setSelectedRegistry(JSON.parse(stored_selection)))
                            }

                            if(process.env.REACT_APP_AKELLO_COGNITO_LOCAL) {                                
                                dispatch(setUserProfile({
                                    first_name: 'Vijay',
                                    last_name: 'Selvaraj',
                                    email: 'vijay@akellohealth.com',
                                    profile_photo: 'https://avatars.githubusercontent.com/u/398292?v=4',
                                }))                                
                            } else {                                
                                dispatch(setUserProfile({
                                    first_name: session.getIdToken().payload['given_name'],
                                    last_name: session.getIdToken().payload['family_name'],
                                    email: session.getIdToken().payload['email'],
                                    profile_photo: session.getIdToken().payload['picture'],
                                }))    
                            }                            
                        }).catch((resp) => {
                            if(signOut) {
                                signOut()
                            }
                        })

                        return routes()
                    }}
                </Authenticator>
            </>

        );
    }
}

export default App;