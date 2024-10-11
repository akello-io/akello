import axios from "axios";

export interface RequestParam {
    api_url: string,
    method: string,
    endpoint: string,
    file_upload?: boolean,
    token: string,
    payload?: any
    onSuccess: (resp: any) => void
    onFail?: (resp: any) => void
}


export class BaseService {

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
                throw new Error("Not implemented")
            }
        }
        if(onFail) {
            onFail(error)
        }
    }

    async apiRequest(params: RequestParam) {

        if(params.file_upload) {
            const formData = new FormData();
            formData.append('file', params.payload);
            await axios.post(params.api_url + '/' + params.endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer " + params.token
                }
            })
                .then((resp) => {
                    params.onSuccess(resp.data)
                })
                .catch((error) => {
                    this.handleFail(error, params.onFail)
                });
            return
        }

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