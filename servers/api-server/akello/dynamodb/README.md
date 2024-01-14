


# DynamoDB Schema



## Registry

| Columns 	        | Type       | Notes                                                                          |
|------------------|------------|--------------------------------------------------------------------------------|
| PK: registry   	 | str        | Primary Key = registry                                                         |
| SK: metadata   	 | str        | Metadata SK is used to indicate all metadata for the object to be stored here. |
| id  	            | str        | Unique ID of the registry                                                      |
| name             | str        | Friendly name for the registry                                                 |
| modified_date    | float      | Date registry was modified                                                     |
| created_date     | float      | Date registry was created                                                      |
| members          | int        | Statistic field - count of members                                             |
| active_patients  | int        | Statistic field - count of active patients                                     |
| questionnaires   | List[dict] | List of questionnaires used for this population                                |



## Registry Patient


| Columns 	                      | Type                | Notes                          |
|--------------------------------|---------------------|--------------------------------|
| PK: registry-patient   	       | str                 | Primary Key = registry-patient |
| SK: patient_mrn   	            | str                 | Patient MRN                    |
| id                             | str                 |                     |
| patient_flag                   | Optional[FlagTypes] |                     |
| patient_mrn                    | str                 |                     |
| date_created                   | float               |                     |
| date_graduated                 | Optional[float]     |                     |
| date_modified                  | float               |                     |
| payer                          | Optional[str]       |                     |
| first_name                     | str                 |                     |
| last_name                      | str                 |                     |
| phone_number                   | str                 |                     |
| email                          | str                 |                     |
| date_of_birth                  | str                 |                     |
| treatment_logs                 | List[TreatmentLogs] |                     |
| audit_logs                     | List[AuditLog]      |                     |
| flags                          | List[dict]          |                     |
| status                         | PatientStatysTypes  |                     |
| initial_assessment             | Optional[int]       |                     |
| last_follow_up                 | Optional[int]       |                     |
| last_psychiatric_consult       | Optional[int]       |                     |
| relapse_prevention_plan        | Optional[int]       |                     |
| total_sessions                 | Optional[int]       |                     |
| weeks_since_initial_assessment | Optional[int]       |                     |
| minutes_this_month             | Optional[int]       |                     |
| schema_version                 | Optional[str]       |                     |




## User
* PK: `user:<user_id>`
* SK: `profile`

## Registry User
* PK: `registry-user:<registry_id>`
* SK: `user:<user_id>`

## User Email
* PK: `user-email:<email>`
* SK: `<user_id>`

## User Registry
* PK: `user-registry:<user_id>`
* SK: `registry:<registry_id>`

## User Invite
* PK: `invite:<email>`
* SK: `registry:<registry_id>`

