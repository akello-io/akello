import {apiRequest} from "./utils";

export const getUser = async (token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "user";
    const resp = await apiRequest({
        method: 'get',
        endpoint: endpoint,
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
            if(onFail) {
                onFail(error)
            }
        }
    });
}

export const getUserRegistries = async (token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "user/registries";
    const resp = await apiRequest({
        method: 'get',
        endpoint: endpoint,
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
            if(onFail) {
                onFail(error)
            }
        }
    });
}
