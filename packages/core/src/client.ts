import { EventTarget } from './event_target';
import axios from "axios";
import { RegistryService } from './services/registry';
export const DEFAULT_BASE_URL = 'http://localhost:8000';


export interface AkelloClientOptions  {
    baseUrl?: string;
    token?: string;    

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


export default class AkelloClient extends EventTarget {

    private readonly options: AkelloClientOptions;
    private readonly registryService: RegistryService;

    constructor(options?: AkelloClientOptions) {
        super();
        this.options = options ?? {};
        this.registryService = new RegistryService();
    }

}