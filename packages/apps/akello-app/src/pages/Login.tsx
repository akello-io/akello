import {cognito_auth_components, cognito_auth_formFields} from "../cognito_auth";
import {Auth} from "aws-amplify";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import {Authenticator} from "@aws-amplify/ui-react";
import React from "react";
import {useNavigate} from "react-router";

const Login = () => {
    const navigate = useNavigate()
    return (
        <>
            <Authenticator formFields={cognito_auth_formFields} components={cognito_auth_components} hideSignUp={false}>
                {({ signOut, user }) => {
                    Auth.currentSession().then((session: CognitoUserSession) => {

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