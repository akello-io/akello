
# Measurement Based Care (MBC) Microservice

Service to run any MBC type clinical model. Our first use-case is the Collaborative Care Model (CoCM).


## MBC Abstractions
Generally, MBC is a process of using patient data to inform clinical decisions. The data can be collected from a variety of sources, including patient-reported outcomes, clinician assessments, and administrative data. The data is then used to inform clinical decisions, such as treatment planning, monitoring, and evaluation. The MBC service provides a set of abstractions to support this process, including:

- **Patient**: A patient is an individual who is receiving care. The patient may have one or more conditions that require treatment. The patient's data is collected and used to inform clinical decisions.
- **Assessment**: An assessment is a set of questions that are used to collect data about a patient's condition. The assessment may be completed by the patient, a clinician, or both. The assessment data is used to inform clinical decisions.
- **Treatment Plan**: A treatment plan is a set of recommendations for treating a patient's condition. The treatment plan may include medications, therapy, lifestyle changes, and other interventions. The treatment plan is based on the patient's data and is used to guide the patient's care.
- **Progress Note**: A progress note is a record of a patient's care. The progress note may include information about the patient's condition, treatment plan, and progress. The progress note is used to track the patient's care over time.
- **Outcome**: An outcome is a measure of the patient's progress. The outcome may be a symptom score, a quality of life measure, or another measure of the patient's condition. The outcome is used to evaluate the effectiveness of the patient's care.
- **Clinical Model**: A clinical model is a set of rules and algorithms that are used to guide the patient's care. The clinical model may include guidelines for assessment, treatment planning, monitoring, and evaluation. The clinical model is used to ensure that the patient receives evidence-based care.
- **Registry**: A registry is a database of patient data. The registry may include patient demographics, assessments, treatment plans, progress notes, outcomes, and other data. The registry is used to store and retrieve patient data.

## Workflows

# Microservice Interface

### Ports
- Referral
- Assessment
- Treatment
- Caseload Review
- Billing
- Workflow

### Adaptors
- DynamoDB Referral Adapter
- DynamoDB Assessment Adapter
- DynamoDB Treatment Adapter
- DynamoDB Caseload Review Adapter
- DynamoDB Billing Adapter
- DynamoDB Workflow Adapter


# Assessments

* Questionnaire JSON
* Questionnaire Response JSON


# Workflows

```mermaid
step:    
    name: str
    status: str
    data:
        key: value
    actions:
        - action1
        - action2
```

```mermaid
workflow:
    steps:
        - step1
        - step2
        - step3
        - step4
        - step5
    transitions:
        - step1 -> step2 | on: success
        - step2 -> step3 | on: success
        - step3 -> step4 | on: success
        - step4 -> step5 | on: success
```

```mermaid
step:
    name: referral
    status: pending
    data:
        patient_id: 123
        Medical history: "..."
        Referral source: "..."
    actions:
        - accept referral
        - assign to care team
        - schedule assessment
        - notify patient
        - reject referral
```

```mermaid
workflow:
    steps:
        - referral
        - assessment
        - treatment
        - graduation
        - relapse prevention
    transitions:
        - referral -> assessment | on: success
        - assessment -> treatment | on: success
        - treatment -> graduation | on: success
        - graduation -> relapse prevention | on: success
```