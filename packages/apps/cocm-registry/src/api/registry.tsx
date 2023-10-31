import {apiRequest} from "./utils";


export const createRegistry = async (token: string, payload: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/create";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        token: token,
        payload: payload,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}



export const referPatient = async (registry_id: string, token: string, referral: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/refer-patient";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        token: token,
        payload: referral,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}




export const getMembers = async (registry_id: string, token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/team-members";
    const resp = await apiRequest({
        method: 'get',
        endpoint: endpoint,
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}



export const getRegistryPatients = async (registry_id: string, token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + '/patients' ;
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


export const saveTreatmentSession = async (registry_id: string, token: string, session: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/record-session";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        payload: session,
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}

export const setFlag = async (registry_id: string, token: string, mrn: string, flag: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/patient-attribute";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        payload: {
            mrn: mrn,
            attr_name: 'patient_flag',
            attr_value: flag
        },
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}

export const setStatus = async (registry_id: string, token: string, mrn: string, status: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/patient-attribute";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        payload: {
            mrn: mrn,
            attr_name: 'status',
            attr_value: status
        },
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}



