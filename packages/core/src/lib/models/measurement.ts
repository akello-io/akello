
export class Measurement {

    user_id: string
    registry_id: string
    measure: string
    value: number

    constructor(
        user_id: string,
        registry_id: string,
        measurement_group_id: string,
        measure: string,
        value: number
    ) {
        this.user_id = user_id
        this.registry_id = registry_id
        this.measure = measure
        this.value = value
    }

}
