import {cognito_auth_components, cognito_auth_formFields} from "../cognito_auth";
import {Auth} from "aws-amplify";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import {Authenticator} from "@aws-amplify/ui-react";
import React from "react";

const Login = () => {
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
                            </div>
                        </>
                    )
                }}
            </Authenticator>

        </>
    )
}

export default Login