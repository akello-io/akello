import { EventTarget } from './event_target';
import axios from "axios";
import { RegistryService } from './services/registry';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
  } from 'amazon-cognito-identity-js';
export const DEFAULT_BASE_URL = 'http://localhost:8000';


export interface AkelloClientInterface {
    login(username: string, password: string, onSuccess: (token: string) => void, onFail: (err: any) => void): void;
    logout(): void;
}

export interface AkelloClientOptions  {
    baseUrl?: string;
    token?: string;    
    cognitoUserPoolId?: string;
    cognitoClientId?: string;
    cognitoEndpoint?: string;    
}

export interface RequestParam {
    api_url: string,
    method: string,
    endpoint: string,
    token: string,
    payload?: any
    onSuccess: (resp: any) => void
    onFail?: (resp: any) => void
}


export class AkelloClient extends EventTarget implements AkelloClientInterface {

    private readonly options: AkelloClientOptions;
    private readonly registryService: RegistryService;

    constructor(options?: AkelloClientOptions) {
        super();
        this.options = options ?? {};
        this.registryService = new RegistryService();
    }

    login(username: string, password: string, onSuccess: (token: string) => void, onFail: (err: any) => void) {
        const authenticationData = {
            Username : username,
            Password : password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const poolData = {                
            UserPoolId: this.options.cognitoUserPoolId!,
		    ClientId: this.options.cognitoClientId!,
		    endpoint: this.options.cognitoEndpoint!
        };
        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username : username,
            Pool : userPool
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result: any) => {
                const accessToken = result.getAccessToken().getJwtToken();
                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
                const idToken = result.idToken.jwtToken;
                onSuccess(accessToken);
                this.options.token = accessToken                
            },
            onFailure: (err: any) => {
                alert(err);
                this.options.token = undefined                
            },
        });
    }

    logout() {
    }

}