import {cognito_auth_components, cognito_auth_formFields} from "../cognito_auth";
import {Auth} from "aws-amplify";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import {Authenticator} from "@aws-amplify/ui-react";
import React from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {setAuthToken} from "../reducers/appSlice";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            <Authenticator formFields={cognito_auth_formFields} components={cognito_auth_components} hideSignUp={false}>
                {({ signOut, user }) => {
                    Auth.currentSession().then((session: CognitoUserSession) => {
                        let token = session.getIdToken().getJwtToken()
                        dispatch(setAuthToken(token))
                    })
                    return (
                        <>
                            <div>
                                You are logged in, go checkout your registry
                                <button onClick={()=> navigate('/')}>enter</button>
                            </div>
                        </>
                    )
                }}
            </Authenticator>

        </>
    )
}

export default Login