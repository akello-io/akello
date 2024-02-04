import axios from "axios";

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

    constructor() {        
    }

    getHeaders(accessToken: string) {
        const authorization = "Bearer " + accessToken
        const headers = {
            Authorization: authorization
        };
        return headers
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
                    if(params.onFail) {
                        params.onFail(error)
                    }
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
                    if(params.onFail) {
                        params.onFail(error)
                    }
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
                    if(params.onFail) {
                        params.onFail(error)
                    }
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
                    if(params.onFail) {
                        params.onFail(error)
                    }
                });
        }

    }
}