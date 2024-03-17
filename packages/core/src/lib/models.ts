export class Registry  {
    id: string
    name: string
    description: string
    patients: number
    members: RegistryMember[] = []    
    measurements: Questionnaire[] = []
    stats: any

    constructor(
        id: string,
        name: string,
        description: string,
        patients: number,
        members: RegistryMember[],
        measurements: Questionnaire[],
        stats: any
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.patients = patients
        this.members = members
        this.measurements = measurements
        this.stats = stats
    }    
}

export class RegistryMember {
    is_admin: boolean
    role: string
    user_id: string
    date_created: number
    last_name: string
    first_name: string
    email: string

    constructor(
        is_admin: boolean,
        role: string,
        user_id: string,
        date_created: number,
        last_name: string,
        first_name: string,
        email: string
    ) {
        this.is_admin = is_admin
        this.role = role
        this.user_id = user_id
        this.date_created = date_created
        this.last_name = last_name
        this.first_name = first_name
        this.email = email
    }
}

export class TreatmentLogScore {
    score_name: string
    score_value: number

    constructor(
        score_name: string,
        score_value: number
    ) {
        this.score_name = score_name
        this.score_value = score_value
    }
}

export class TreatmentLog {
    id: string
    contact_type: string
    weeks_in_treatment: number
    visit_type: string
    minutes?: number
    scores: TreatmentLogScore[]
    date: number
    no_show?: boolean

    constructor(
        contact_type: string,
        weeks_in_treatment: number,
        visit_type: string,
        minutes: number,
        scores: TreatmentLogScore[],
        date: number,
        no_show: boolean
    ) {
        this.id = contact_type + visit_type + date
        this.contact_type = contact_type
        this.weeks_in_treatment = weeks_in_treatment
        this.visit_type = visit_type
        this.scores = scores
        this.minutes = minutes
        this.date = date
        this.no_show = no_show
    }

}

export class EventLog {
    id: string    
    system?: string
    data?: any
    created_date: number
    modified_date: number

    constructor(
        id: string,  
        system: string,
        data: any,
        created_date: number,
        modified_date: number
    ) {
        this.id = id
        this.system = system
        this.data = data
        this.created_date = created_date
        this.modified_date = modified_date
    }
}


export class QuestionnaireResponse {
    id: string
    response: string
    score: number

    constructor(
        id: string,
        response: string,
        score: number
    ) {
        this.id = id
        this.response = response
        this.score = score
    }
}
export class QuestionnaireQuestion {
    id: string
    question: string
    responses: QuestionnaireResponse[]
    score: number

    constructor(
        id: string,
        question: string,
        responses: QuestionnaireResponse[],
        score: number
    ) {
        this.id = id
        this.question = question
        this.responses = responses
        this.score = score
    }
}

// TODO: This doesn't represent the model from the server
export class Questionnaire {
    uid: string
    name: string
    type: string
    active?: boolean
    measurements: QuestionnaireQuestion[]

    constructor(
        uid: string,
        name: string,
        type: string,
        active: boolean,
        measurements: any
    ) { 
        this.uid  = uid
        this.name = name
        this.type = type
        this.active = active
        this.measurements = measurements
    }

}

export class PatientRegistry {
    id: string
    flag?: string
    patient_mrn: string
    first_name: string
    last_name: string
    phone_number: string
    email: string
    date_of_birth: string

    referring_provider_npi?: string
    payer?: string
    status?: string

    initial_assessment?: number
    last_follow_up?: number
    last_psychiatric_consult?: number
    relapse_prevention_plan?: number
    total_sessions?: number
    weeks_since_initial_assessment?: number
    minutes_this_month?: number

    integration_metriport_fhir_data?: any

    treatment_logs?: TreatmentLog[] = []
    event_logs?: EventLog[] = []

    constructor(
        registry_id: string,
        patient_mrn: string,
        first_name: string,
        last_name: string,
        phone_number: string,
        email: string,
        date_of_birth: string
    ) {
        this.id = registry_id
        this.patient_mrn = patient_mrn
        this.first_name = first_name
        this.last_name = last_name
        this.phone_number = phone_number
        this.email = email
        this.date_of_birth = date_of_birth
    }

}
    
export class AkelloApp {
    id: string
    group: string
    status: string
    name: string
    description: string
    logo: string
    react_component: string
    configs: any

    constructor(
        id: string,
        group: string,
        status: string,
        name: string,
        description: string,
        logo: string,
        react_component: string,
        configs: any
    ) {
        this.id = id
        this.group = group
        this.status = status
        this.name = name
        this.description = description
        this.logo = logo
        this.react_component = react_component
        this.configs = configs
    }

}