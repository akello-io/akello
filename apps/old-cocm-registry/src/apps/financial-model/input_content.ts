
export const group_input_content = {
    "model-description": {
        "short-description": "Financial Model",
        "description": "Describe what you are modeling. For example: Moderate Depression Population",
        "inputs": {}
    },
    "facility-location": {
        "short-description": "Facility Location",
        "description": "This will be used later to automatically add the latest billing rates for your region.",
        "inputs": {}
    },
    "cocm-participation": {
        "short-description": "Current CoCM Participation",
        "description": "This gives the model an understanding of what type of patient caseload we can forecast.",
        "inputs": {
            "full-time-pcp": {
                "short-description": "Full-time PCP's",
                "tooltip": "The total number of FTE's you have staffed now"
            },
            "pct-pcp-cocm": {
                "short-description": "% of PCP's participation in CoCM",
                "tooltip": "The total % of Full-time PCP's that will participate in CoCM and refer patients every month."
            },
            "referrals-per-pcp": {
                "short-description": "Referrals per PCP /mo",
                "tooltip": "The number of new patient referrals per PCP into CoCM per month."
            },
            "pct_patients_accepting": {
                "short-description": "% of Patients accepting CoCM",
                "tooltip": "From all the patients that were referred, the % that started their first session."
            },
            "pct_patients_graduating": {
                "short-description": "% of Patients graduating",
                "tooltip": "The % of patients from the caseload that graduate or stop CoCM."
            }
        }
    },
    "caseload-complexity": {
        "short-description": "Caseload Complexity",
        "description": "This gives the model an understanding of what type of patient caseload we can forecast and the ratio of patients to Care Manager.",
        "inputs": {
            "suicidality-risk": {
                "short-description": "% of patients with suicidality risk",
                "tooltip": "The % of patients being referred that likely have thoughts of suicide"
            },
            "prior-ed-visit": {
                "short-description": "% of patients with prior mental health ED visit",
                "tooltip": "The % of patients being referred that have previously been hospitalized due to a mental health episode"
            },
            "substance-abuse": {
                "short-description": "% of patients with substance abuse",
                "tooltip": "The % of patients being referred that have a history of substance abuse"
            },
            "above-moderate-level": {
                "short-description": "% of patients above moderate level",
                "tooltip": "The % of patients being referred that are above moderate level of depression/anxiety"
            }
        }
    },
    "payer-mix": {
        "short-description": "Payer Mix",
        "description": "This gives the model an understanding of what type of patient caseload we can forecast.",
        "inputs": {
            "medicare-patients": {
                "short-description": "Medicare",
                "tooltip": "% of patients using Medicare"
            },
            "medicaid-patients": {
                "short-description": "Medicaid",
                "tooltip": "% of patients using Medicaid"
            },
            "commerical-cocm": {
                "short-description": "Commercial - accepts CoCM",
                "tooltip": "% of patients that use Commercial Payers that accept CoCM billing"
            },
            "commerical-no-cocm": {
                "short-description": "Commercial - doesn't accept CoCM",
                "tooltip": "% of patients that use Commercial Payers that don't accept CoCM billing"
            }
        }
    },
    "staffing-costs": {
        "short-description": "Staffing Costs",
        "description": "This gives the model an understanding of what type of patient caseload we can forecast.",
        "inputs": {
            "bhm-salary": {
                "short-description": "Salary",
                "tooltip": "Annual Salary for the Care Manager"
            },
            "bhm-benefits": {
                "short-description": "Benefits",
                "tooltip": "% of total comp that is allocated to benefits"
            },
            "cp-salary": {
                "short-description": "Salary",
                "tooltip": "Annual Salary for the Psychiatrist"
            },
            "cp-benefits": {
                "short-description": "Benefits",
                "tooltip": "% of total comp that is allocated to benefits"
            }
        }
    },
    "bhm-service-units": {
        "short-description": "Care Manager Service Unit",
        "description": "",
        "inputs": {
            "direct-warm-connection-over-16": {
                "short-description": "Warm Connection Visit 16 + min",
                "tooltip": "xx"
            },
            "direct-initial-assessment-visit": {
                "short-description": "Initial Assessment Visit",
                "tooltip": "xx"
            },
            "direct-follow-up-visit": {
                "short-description": "Follow-up Visit",
                "tooltip": "xx"
            },
            "direct-group-treatment": {
                "short-description": "Group Treatment Visit",
                "tooltip": "xx"
            },
            "other-warm-connection": {
                "short-description": "Warm Connection visit under 16 minutes",
                "tooltip": "xx"
            },
            "other-outreach-attempts": {
                "short-description": "Outreach attempts (phone, letter, etc)",
                "tooltip": "xx"
            },
            "other-telephone-visit": {
                "short-description": "Telephone Visit",
                "tooltip": "xx"
            },
            "other-caseload-and-patient-review-psych": {
                "short-description": "Caseload and Patient Review with Psych Consultant",
                "tooltip": "xx"
            },
            "other-team-communication": {
                "short-description": "Team Communication",
                "tooltip": "xx"
            },
            "other-registry-management": {
                "short-description": "Registry Management",
                "tooltip": "xx"
            },
            "admin-charting": {
                "short-description": "Charting",
                "tooltip": "xx"
            },
            "admin-other": {
                "short-description": "Other (Clinical Supervision, Staff Meetings, Training, etc.)",
                "tooltip": "xx"
            },
        }
    },
    "psych-service-units": {
        "short-description": "Psychiatric Service Unit",
        "description": "",
        "inputs": {
            "indirect-registry-review": {
                "short-description": "Registry Review",
                "tooltip": "xx"
            },
            "indirect-pcp-communication": {
                "short-description": "Direct PCP Communication",
                "tooltip": "xx"
            },
            "indirect-bhm-review": {
                "short-description": "Caseload and Patient Review with BH Care Manager",
                "tooltip": "xx"
            },
            "indirect-charting": {
                "short-description": "Charting",
                "tooltip": "xx"
            },
            "indirect-other": {
                "short-description": "Other (Reseach, Staff Meetings, Training, etc.)",
                "tooltip": "xx"
            },
            "direct-treatment-assessment": {
                "short-description": "Direct Treatment: Assessment Visit",
                "tooltip": "xx"
            },
            "direct-treatment-follow-up": {
                "short-description": "Direct Treatment: Follow-up Visits",
                "tooltip": "xx"
            },

        }
    }


}
