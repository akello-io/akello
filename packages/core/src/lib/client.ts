import { EventTarget } from './event_target';
import axios from "axios";
import { RegistryService } from './services/registry';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
  } from 'amazon-cognito-identity-js';
import { UserService } from './services';
import { FinancialModelService } from './services/financial_model';
import { ReportsService } from './services/reports';
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
    onUnauthenticated?: () => void 
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
    public readonly registryService: RegistryService;
    public readonly userService: UserService;
    public readonly financialService: FinancialModelService;
    public readonly reportsService: ReportsService;


    constructor(options?: AkelloClientOptions) {
        super();
        this.options = options ?? {};
        this.registryService = new RegistryService(this);
        this.userService = new UserService(this);
        this.financialService = new FinancialModelService(this);
        this.reportsService = new ReportsService(this);

    }

    getOptions() {
        return this.options;
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
                this.options.token = accessToken
                onSuccess(accessToken);
                
            },
            onFailure: (err: any) => {                
                this.options.token = undefined                
                onFail(err);
            },
        });
    }

    logout() {
    }

    handleUnauthenticated() {
        if (this.options.onUnauthenticated) {
            this.options.onUnauthenticated();
        }
    }

}