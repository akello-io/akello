import axios from "axios";
import { AkelloClient } from "../client";

export interface RequestParam {
    api_url: string,
    method: string,
    endpoint: string,
    token: string,
    payload?: any
    onSuccess: (resp: any) => void
    onFail?: (resp: any) => void
}


export class BaseService {
    readonly client: AkelloClient
    constructor(client: AkelloClient) {  
        this.client = client  
    }

    getHeaders(accessToken: string) {
        const authorization = "Bearer " + accessToken
        const headers = {
            Authorization: authorization
        };
        return headers
    }

    handleFail(error: any, onFail?: (resp: any) => void) {
        if(error.response) {
            if(error.response.status == 401) {
                this.client.handleUnauthenticated()
            }
        }       
        if(onFail) {
            onFail(error)
        }
    }
    
    async apiRequest(params: RequestParam) {

        if(params.method == 'get') {
            await axios.get(params.api_url + '/' + params.endpoint, {
                headers: this.getHeaders(params.token),
            })
                .then((resp) => {
                    params.onSuccess(resp.data)
                })
                .catch((error) => {
                    this.handleFail(error, params.onFail)
                });
        }
    
        if(params.method == 'put') {
            await axios.put(params.api_url + '/' + params.endpoint, params.payload, {
                headers: this.getHeaders(params.token),
            })
                .then((resp) => {
                    params.onSuccess(resp.data)
                })
                .catch((error) => {
                    this.handleFail(error, params.onFail)
                });
        }
    
        if(params.method == 'post') {
            await axios.post(params.api_url + '/' + params.endpoint, params.payload, {
                headers: this.getHeaders(params.token),
            })
                .then((resp) => {
                    params.onSuccess(resp.data)
                })
                .catch((error) => {
                    this.handleFail(error, params.onFail)
                });
        }
    
        if(params.method == 'delete') {
            await axios.delete(params.api_url + '/' + params.endpoint, {
                headers: this.getHeaders(params.token),
            })
                .then((resp) => {
                    params.onSuccess(resp.data)
                })
                .catch((error) => {
                    this.handleFail(error, params.onFail)
                });
        }

    }
}