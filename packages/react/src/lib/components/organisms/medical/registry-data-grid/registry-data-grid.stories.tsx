import React from 'react'
import { RegistryDataGrid, RegistryDataGridProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RegistryDataGrid> = {
    title: 'Organisims/Medical/RegistryDataGrid',
    component: RegistryDataGrid,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        patients: [],
        questionnaires: [],
        handlePatientClickEvent: () => {}
    },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof RegistryDataGrid> = (args: RegistryDataGridProps) => <RegistryDataGrid {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    patients: [
        {
            "id": "1f371e53-ed55-2560-bb93-02d8b66bcde2",
            "patient_flag": null,
            "patient_mrn": "ff",
            "date_created": 1708684622.374724,
            "date_graduated": null,
            "date_modified": 1708684622.374735,
            "payer": "Anthem, Inc.",
            "first_name": "33",
            "last_name": "33",
            "phone_number": "433",
            "email": "3@3.com",
            "date_of_birth": "2024-02-07",
            "treatment_logs": [
                {
                    "patient_mrn": "ff",
                    "provider": null,
                    "no_show": false,
                    "flag": null,
                    "weeks_in_treatment": 0,
                    "contact_type": "Psychiatric Consultation",
                    "visit_type": "Phone",
                    "scores": [
                        {
                            "score_name": "GAD-7",
                            "score_value": 1
                        },
                        {
                            "score_name": "PHQ-9",
                            "score_value": 0
                        }
                    ],
                    "minutes": 0.08333333333333333,
                    "sms_reminder_sent_date": null,
                    "sms_conformation_received_date": null,
                    "total_sms_reminders_sent": 0,
                    "email_reminder_sent_date": null,
                    "email_conformation_received_date": null,
                    "total_email_reminders_sent": 0,
                    "date": 1708656264370
                },
                {
                    "patient_mrn": "ff",
                    "provider": null,
                    "no_show": false,
                    "flag": null,
                    "weeks_in_treatment": 0,
                    "contact_type": "Psychiatric Consultation",
                    "visit_type": "Phone",
                    "scores": [
                        {
                            "score_name": "GAD-7",
                            "score_value": 4
                        },
                        {
                            "score_name": "PHQ-9",
                            "score_value": 5
                        }
                    ],
                    "minutes": 0.13333333333333333,
                    "sms_reminder_sent_date": null,
                    "sms_conformation_received_date": null,
                    "total_sms_reminders_sent": 0,
                    "email_reminder_sent_date": null,
                    "email_conformation_received_date": null,
                    "total_email_reminders_sent": 0,
                    "date": 1708656286471
                }
            ],
            "event_logs": [],
            "audit_logs": [],
            "flags": [],
            "status": "Enrolled",
            "initial_assessment": 1708656286471,
            "last_follow_up": 1708656286471,
            "last_psychiatric_consult": 1708656286471,
            "relapse_prevention_plan": 1708656286471,
            "total_sessions": 0,
            "weeks_since_initial_assessment": 0,
            "minutes_this_month": 0,
            "schema_version": "V1"
        },
        {
            "id": "1f371e53-ed55-2560-bb93-02d8b66bcde2",
            "patient_flag": null,
            "patient_mrn": "ff",
            "date_created": 1708684622.374724,
            "date_graduated": null,
            "date_modified": 1708684622.374735,
            "payer": "Anthem, Inc.",
            "first_name": "33",
            "last_name": "33",
            "phone_number": "433",
            "email": "3@3.com",
            "date_of_birth": "2024-02-07",
            "treatment_logs": [
                {
                    "patient_mrn": "ff",
                    "provider": null,
                    "no_show": false,
                    "flag": null,
                    "weeks_in_treatment": 0,
                    "contact_type": "Psychiatric Consultation",
                    "visit_type": "Phone",
                    "scores": [
                        {
                            "score_name": "GAD-7",
                            "score_value": 1
                        },
                        {
                            "score_name": "PHQ-9",
                            "score_value": 0
                        }
                    ],
                    "minutes": 0.08333333333333333,
                    "sms_reminder_sent_date": null,
                    "sms_conformation_received_date": null,
                    "total_sms_reminders_sent": 0,
                    "email_reminder_sent_date": null,
                    "email_conformation_received_date": null,
                    "total_email_reminders_sent": 0,
                    "date": 1708656264370
                },
                {
                    "patient_mrn": "ff",
                    "provider": null,
                    "no_show": false,
                    "flag": null,
                    "weeks_in_treatment": 0,
                    "contact_type": "Psychiatric Consultation",
                    "visit_type": "Phone",
                    "scores": [
                        {
                            "score_name": "GAD-7",
                            "score_value": 4
                        },
                        {
                            "score_name": "PHQ-9",
                            "score_value": 5
                        }
                    ],
                    "minutes": 0.13333333333333333,
                    "sms_reminder_sent_date": null,
                    "sms_conformation_received_date": null,
                    "total_sms_reminders_sent": 0,
                    "email_reminder_sent_date": null,
                    "email_conformation_received_date": null,
                    "total_email_reminders_sent": 0,
                    "date": 1708656286471
                }
            ],
            "event_logs": [],
            "audit_logs": [],
            "flags": [],
            "status": "Enrolled",
            "initial_assessment": 1708656286471,
            "last_follow_up": 1708656286471,
            "last_psychiatric_consult": 1708656286471,
            "relapse_prevention_plan": 1708656286471,
            "total_sessions": 0,
            "weeks_since_initial_assessment": 0,
            "minutes_this_month": 0,
            "schema_version": "V1"
        }
    ],
    questionnaires: [
        {
            "name": "GAD-7",
            "uid": "gad7",
            "type": "survey",
            "measurements": [
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "1",
                    "question": "Little interest or pleasure in doing things?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "2",
                    "question": "Feeling down, depressed, or hopeless?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "3",
                    "question": "Trouble falling or staying asleep, or sleeping too much?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "4",
                    "question": "Feeling tired or having little energy?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "5",
                    "question": "Poor appetite or overeating?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "6",
                    "question": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "7",
                    "question": "Trouble concentrating on things, such as reading the newspaper or watching television?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "8",
                    "question": "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "9",
                    "question": "Thoughts that you would be better off dead, or of hurting yourself in some way?"
                }
            ]
        },
        {
            "name": "PHQ-9",
            "uid": "phq9",
            "type": "survey",
            "measurements": [
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "1",
                    "question": "Little interest or pleasure in doing things?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "2",
                    "question": "Feeling down, depressed, or hopeless?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "3",
                    "question": "Trouble falling or staying asleep, or sleeping too much?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "4",
                    "question": "Feeling tired or having little energy?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "5",
                    "question": "Poor appetite or overeating?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "6",
                    "question": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "7",
                    "question": "Trouble concentrating on things, such as reading the newspaper or watching television?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "8",
                    "question": "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?"
                },
                {
                    "responses": [
                        {
                            "score": 0,
                            "response": "Not at all",
                            "id": "0"
                        },
                        {
                            "score": 1,
                            "response": "Several days",
                            "id": "1"
                        },
                        {
                            "score": 2,
                            "response": "More than half the days",
                            "id": "2"
                        },
                        {
                            "score": 3,
                            "response": "Nearly every day",
                            "id": "3"
                        }
                    ],
                    "score": 0,
                    "id": "9",
                    "question": "Thoughts that you would be better off dead, or of hurting yourself in some way?"
                }
            ]
        }
    ],
    handlePatientClickEvent: () => {}  
}
