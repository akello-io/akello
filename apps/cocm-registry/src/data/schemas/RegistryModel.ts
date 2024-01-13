
export class TreatmentLog {
    id: string
    contact_type: string
    weeks_in_treatment: number
    visit_type: string
    phq9_score?: number
    gad7_score?: number
    minutes?: number
    date: number
    no_show?: boolean

    constructor(
        contact_type: string,
        weeks_in_treatment: number,
        visit_type: string,
        phq9_score: number,
        gad7_score: number,
        minutes: number,
        date: number,
        no_show: boolean
    ) {
        this.id = contact_type + visit_type + date
        this.contact_type = contact_type
        this.weeks_in_treatment = weeks_in_treatment
        this.visit_type = visit_type
        this.phq9_score = phq9_score
        this.gad7_score = gad7_score
        this.minutes = minutes
        this.date = date
        this.no_show = no_show
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

export class Questionnaire {
    uid: string
    name: string
    questions: QuestionnaireQuestion[]

    constructor(
        uid: string,
        name: string,
        questions: any
    ) {
        debugger
        this.uid  = uid
        this.name = name
        this.questions = questions
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


    payer?: string
    status?: string

    initial_assessment?: number
    last_follow_up?: number
    last_psychiatric_consult?: number
    relapse_prevention_plan?: number
    total_sessions?: number
    weeks_since_initial_assessment?: number
    minutes_this_month?: number

    treatment_logs?: TreatmentLog[] = []

    constructor(
        patient_mrn: string,
        first_name: string,
        last_name: string,
        phone_number: string,
        email: string,
        date_of_birth: string
    ) {
        this.id = patient_mrn
        this.patient_mrn = patient_mrn
        this.first_name = first_name
        this.last_name = last_name
        this.phone_number = phone_number
        this.email = email
        this.date_of_birth = date_of_birth
    }

}