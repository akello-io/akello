import axios from "axios";

export interface RequestParam {
    method: string,
    endpoint: string,
    token: string,
    payload?: any
    onSuccess: (resp: any) => void
    onFail?: (resp: any) => void
}

const getHeaders = (accessToken: string) => {
    const authorization = "Bearer " + accessToken
    const headers = {
        Authorization: authorization
    };
    return headers
}

export const apiRequest = async (params: RequestParam) => {
    if(params.method == 'get') {
        await axios.get(process.env.REACT_APP_TEST_AWS_API + '/' + params.endpoint, {
            headers: getHeaders(params.token),
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
        await axios.put(process.env.REACT_APP_TEST_AWS_API + '/' + params.endpoint, params.payload, {
            headers: getHeaders(params.token),
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
        await axios.post(process.env.REACT_APP_TEST_AWS_API + '/' + params.endpoint, params.payload, {
            headers: getHeaders(params.token),
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
        await axios.delete(process.env.REACT_APP_TEST_AWS_API + '/' + params.endpoint, {
            headers: getHeaders(params.token),
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