import { AkelloClient } from '@akello/core'

const config = {
    baseUrl: import.meta.env.VITE_API,
    cognitoUserPoolId: import.meta.env.VITE_AWS_COGNITO_USERPOOL_ID,
    cognitoClientId: import.meta.env.VITE_AWS_COGNITO_APP_CLIENT_ID,
            ...(import.meta.env.VITE_AKELLO_COGNITO_URL && {
                cognitoEndpoint: import.meta.env.VITE_AKELLO_COGNITO_URL,
                authenticationFlowType: "USER_PASSWORD_AUTH",
    }),
    onUnauthenticated: () => {
        window.location.href = '/login'
    }
  }

  export const akello_client = new AkelloClient(config)