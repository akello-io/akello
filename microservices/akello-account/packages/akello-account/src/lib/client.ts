

export const DEFAULT_BASE_URL = 'http://localhost:8000';

export interface AkelloAccountClientOptions {
    baseUrl?: string;
    cognitoUserPoolId?: string;
    cognitoClientId?: string;
    cognitoEndpoint?: string;
    storage?: Storage;
    onUnauthenticated?: () => void;
}

export interface AkelloAccountClientInterface {
    login(
        username: string,
        password: string,
        onSuccess: (token: string) => void,
        onFail: (err: any) => void
    ): void;
    logout(): void;
    handleUnauthenticated(): void;
}


export class AkelloAccountClient extends EventTarget implements AkelloAccountClientInterface {


    /**
     * Creates a new instance of the AkelloClient class.
     * @param options - The options for configuring the AkelloAccountClient.
     */
    constructor(options?: AkelloAccountClientOptions) {
        super();
    }

    login(
        username: string,
        password: string,
        onSuccess: (token: string) => void,
        onFail: (err: any) => void
    ): void {
        // ...
    }

    logout(): void {
        // ...
    }

    handleUnauthenticated(): void {
        // ...
    }

}
