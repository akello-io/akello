import { Container, Group, Paper, Text, Title } from '@mantine/core';


interface Activity {
    name: string
}

interface PayerCode {
    code: string;
    description: string;
    activities: Activity[]; // list of activities that can be billed
    adjacent_codes: PayerCode[]; // codes this can also be billed with
    start_month?: number; // which month the code is billable from
    end_month?: number; // which month the code is billable to    
    min_minutes?: number;
    max_minutes?: number;
    additional_minutes?: number;
}


interface Payer {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    fax: string;
    email: string;
    codes: PayerCode[];
}

const PayerSettings = () => {

    const initial_consultation_activity: Activity = { name: "Initial Consultation" }
    const caseload_review_activity: Activity = { name: "Caseload Review" }
    const patient_review_activity: Activity = { name: "Patient Review" }
    const consultation_activity: Activity = { name: "Consultation" }
    const follow_up_activity: Activity = { name: "Follow-up" }

    const cpt99492: PayerCode = {                
        code: "99492",
        description: "Initial setup and patient education on the use of equipment",
        activities: [
            initial_consultation_activity,
            caseload_review_activity,
            patient_review_activity,
            consultation_activity,
            follow_up_activity            
        ],
        adjacent_codes: [],
        start_month: 0,
        end_month: 1,
        min_minutes: 70        
    }

    const cpt99493: PayerCode = {        
        code: "99493",
        description: "Following the first month, the patient and care management team meets for a required 60-minute check-in",
        activities: [
            caseload_review_activity,
            patient_review_activity,
            consultation_activity,
            follow_up_activity
        ],
        adjacent_codes: [],        
        start_month: 1,
        min_minutes: 60,
        max_minutes: 30
    }

    const cpt99494: PayerCode = {
        code: "99494",
        description: "Each additional 30 minutes of care management services",
        activities: [
            caseload_review_activity,
            patient_review_activity,
            consultation_activity,
            follow_up_activity
        ],
        adjacent_codes: [cpt99492, cpt99493],
        additional_minutes: 30
    }
    
}

export default PayerSettings;
