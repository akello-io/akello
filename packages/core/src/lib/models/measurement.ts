enum MeasureTypes {
    patient_caseload_review_minutes = 'patient_caseload_review_minutes',
    patient_session_minutes = 'patient_session_minutes'
};

export class Measurement {

    user_id: string
    registry_id: string
    reported_by_user_id: string
    measure: MeasureTypes
    value: number

    constructor(user_id: string, registry_id: string, reported_by_user_id: string, measure: MeasureTypes, value: number) {
        this.user_id = user_id
        this.registry_id = registry_id
        this.reported_by_user_id = reported_by_user_id
        this.measure = measure
        this.value = value
    }

}
