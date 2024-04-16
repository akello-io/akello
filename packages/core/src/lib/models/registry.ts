
export class Registry {
    id: string
    organization_id?: string
    name?: string
    logo?: string

    constructor(
        id: string,
        organization_id: string,
        name: string,
        logo: string
    ) {
        this.id = id
        this.organization_id = organization_id
        this.name = name
        this.logo = logo
    }
}

export class RegistryUser {
    registry_id: string
    user_id: string

    constructor(
        registry_id: string,
        user_id: string
    ) {
        this.registry_id = registry_id
        this.user_id = user_id
    }
}


export class RegistryTreatment {

    registry_id: string
    user_id: string
    mrn: string
    status: string
    referring_npi: string
    payer: string
    flag?: string

    first_name?: string
    last_name?: string
    phone_number?: string
    email?: string
    date_of_birth?: string


    initial_assessment?: number
    last_follow_up?: number
    last_psychiatric_consult?: number
    relapse_prevention_plan?: number
    graduated?: number

    total_sessions?: number
    weeks_since_initial_assessment?: number
    minutes_this_month?: number

    constructor(
        registry_id: string,
        user_id: string,
        mrn: string,
        status: string,
        referring_npi: string,
        payer: string
    ) {
        this.registry_id = registry_id
        this.user_id = user_id
        this.mrn = mrn
        this.status = status
        this.referring_npi = referring_npi
        this.payer = payer
    }
}
