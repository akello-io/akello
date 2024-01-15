


# CoCM Registry - DynamoDB Schema



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

| Columns 	                      | Type      | Notes |
|--------------------------------|-----------|---|
| PK: user:<cognito_user_id>   	 | str       | Primary Key = user:<cognito_user_id> |
| SK: profile   	                | str       |   |
| email                          | str       |   |
| first_name                     | str       |   |
| last_name                      | str       |   |
| phone_number                   | str       |   |
| registeries                    | List[str] |   |




## Registry User


| Columns 	                           | Type     | Notes |
|-------------------------------------|----------|---|
| PK: registry-user:<registry_id>   	 | str      | Primary Key = registry-user:<registry_id> |
| SK: user:<user_id>   	              | str      |   |
| date_created                        | int      |   |
| first_name                          | str      |   |
| last_name                           | str      |   |
| role                                | UserRole |   |
| is_admin                            | UserRole |   |


## User Email

| Columns 	                  | Type | Notes |
|----------------------------|------|---|
| PK: user-email:<email>   	 | str  | Primary Key = user-email:<email> |
| SK: user_id   	            | str  |  |
| email                      | str  |  |
| date_created               | int  |  |



## User Registry

| Columns 	                  | Type | Notes |
|----------------------------|------|---|
| PK: user-registry:<user_id>   	 | str  | Primary Key = user-registry:<user_id> |
| SK: registry:<registry_id>   	    | str  |  |
| date_created               | int  |  |


## User Invite

| Columns 	                      | Type     | Notes |
|--------------------------------|----------|---|
| PK: invite:<email>   	         | str      | Primary Key = invite:<email> |
| SK: registry:<registry_id>   	 | str      |  |
| email                          | str      |  |
| first_name                     | str      |  |
| last_name                      | str      |  |
| invited_by                     | str      |  |
| registry_id                    | str      |  |
| date_created                   | int      |  |
| role                           | UserRole |  |

