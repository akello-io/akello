import { AkelloClient } from '../client';
import { AkelloApp } from '../models';
import { BaseService } from './base';

export class RegistryService extends BaseService {
    
    constructor(client: AkelloClient) {
        super(client);        
    }

    /**
     * Retrieves a registry by its ID.
     * @param registry_id - The ID of the registry to retrieve.
     * @param onSuccess - The callback function to be called when the request is successful.
     * @param onFail - The optional callback function to be called when the request fails.
     */
    async getRegistry(registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id;
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    /**
     * Creates a new registry.
     * @param payload - The payload for creating the registry.
     * @param onSuccess - The callback function to be called on successful creation.
     * @param onFail - The callback function to be called on failure.
     */
    async createRegistry(payload: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/create";            
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: payload,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {        
                
            }
        });
    }

    /**
     * Refers a patient to a registry.
     * @param registry_id - The ID of the registry.
     * @param referral - The referral details.
     * @param onSuccess - The callback function to be called on successful referral.
     * @param onFail - The callback function to be called on failure.
     */
    async referPatient(registry_id: string, referral: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/refer-patient";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: referral,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    /**
     * Retrieves the members of a registry.
     * @param registry_id - The ID of the registry.
     * @param onSuccess - The callback function to be called on successful retrieval.
     * @param onFail - The callback function to be called on failure.
     */
    async getMembers(registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/team-members";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    /**
     * Retrieves the patients of a registry.
     * @param registry_id - The ID of the registry.
     * @param onSuccess - The callback function to be called on successful retrieval.
     * @param onFail - The callback function to be called on failure.
     */
    async getRegistryPatients(registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + '/patients' ;
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    
    }

    /**
     * Saves a treatment session for a registry.
     * @param registry_id - The ID of the registry.
     * @param session - The treatment session details.
     * @param onSuccess - The callback function to be called on successful save.
     * @param onFail - The callback function to be called on failure.
     */
    async saveTreatmentSession(registry_id: string,  session: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/record-session";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            payload: session,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    /**
     * Sets a flag for a patient in a registry.
     * @param registry_id - The ID of the registry.
     * @param mrn - The MRN (Medical Record Number) of the patient.
     * @param flag - The flag to be set.
     * @param onSuccess - The callback function to be called on successful flag setting.
     * @param onFail - The callback function to be called on failure.
     */
    async setFlag(registry_id: string, mrn: string, flag: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/patient-attribute";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            payload: {
                mrn: mrn,
                attr_name: 'patient_flag',
                attr_value: flag
            },
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

    /**
     * Sets the status for a patient in a registry.
     * @param registry_id - The ID of the registry.
     * @param mrn - The MRN (Medical Record Number) of the patient.
     * @param status - The status to be set.
     * @param onSuccess - The callback function to be called on successful status setting.
     * @param onFail - The callback function to be called on failure.
     */
    async setStatus(registry_id: string,  mrn: string, status: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/patient-attribute";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            payload: {
                mrn: mrn,
                attr_name: 'status',
                attr_value: status
            },
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }


    async setMeasurements(registry_id: string, measurements: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {

        const endpoint =  "registry/" + registry_id + "/measurements";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'put',
            endpoint: endpoint,
            payload: measurements,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }


    async getAppConfigs(registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/app-configs";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    async saveAkelloApp(registry_id: string, akello_app: AkelloApp, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/app-configs/" + akello_app.id + "/save"
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            payload: akello_app,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

}
