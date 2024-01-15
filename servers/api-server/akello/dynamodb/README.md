


# CoCM Registry - DynamoDB Schema

DB schema for all the objects needed for the CoCM Registry. This can later be expanded into more specialized registries with custom roles for that specific registry model.

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

[!CAUTION] 
> We are missing the Registry ID. This only allows a patient to ever be part of one registry. 

[!WARNING]
> Columns to be reviewed: patient_flag, flags, status

| Columns 	                      | Type                | Notes                                                                 |
|--------------------------------|---------------------|-----------------------------------------------------------------------|
| PK: registry-patient   	       | str                 | Primary Key = registry-patient                                        |
| SK: patient_mrn   	            | str                 | Patient MRN                                                           |
| id                             | str                 | This is unique for the account but not globally unique                |
| patient_flag                   | Optional[FlagTypes] | Current active Flag                                                   |
| patient_mrn                    | str                 | Globally unique ID used for sort-key                                  |
| date_created                   | float               | Date this patient was created in the registry                         |
| date_graduated                 | Optional[float]     | Date the patient graduated from the registry                          |
| date_modified                  | float               | Date the patient was modified                                         |
| payer                          | Optional[str]       | The insurance name for the patient                                    |
| first_name                     | str                 | Patients first name                                                   |
| last_name                      | str                 | Patients last name                                                    |
| phone_number                   | str                 | Patients phone-number                                                 |
| email                          | str                 | Patients email                                                        |
| date_of_birth                  | str                 | Patients date of birth                                                |
| treatment_logs                 | List[TreatmentLogs] | Log of all measurements                                               |
| audit_logs                     | List[AuditLog]      |                                                                       |
| flags                          | List[dict]          |                                                                       |
| status                         | PatientStatysTypes  |                                                                       |
| initial_assessment             | Optional[int]       | Date the patient was initially assessed                               |
| last_follow_up                 | Optional[int]       | Last time the someone followed up with the patient                    |
| last_psychiatric_consult       | Optional[int]       | Last time a psychiatrist reviewed the patient                         |
| relapse_prevention_plan        | Optional[int]       | Date when the relapse prevention plan was communicated to the patient |
| total_sessions                 | Optional[int]       | Total number of treatment sessions                                    |
| weeks_since_initial_assessment | Optional[int]       | Weeks since initial assessment                                        |
| minutes_this_month             | Optional[int]       | Total minutes the patient has for this month                          |
| schema_version                 | Optional[str]       | The DB schema version used on the last update                         |


## User

[!WARNING]
> Columns to be reviewed: registeries

| Columns 	                      | Type      | Notes                                   |
|--------------------------------|-----------|-----------------------------------------|
| PK: user:<cognito_user_id>   	 | str       | Primary Key = user:<cognito_user_id>    |
| SK: profile   	                | str       |                                         |
| email                          | str       | Email collected from AWS Cognito        |
| first_name                     | str       | First name collected from AWS Cognito   |
| last_name                      | str       | Last name collected from AWS Cognito    |
| phone_number                   | str       | Phone number collected from AWS Cognito |
| registeries                    | List[str] |                                         |



## Registry User

[!WARNING]
> Columns to be reviewed: is_admin - do we need it if we have a role?
> Columns to be reviewed: first_name, last_name - why not just pull it from the User object?

| Columns 	                           | Type     | Notes                                     |
|-------------------------------------|----------|-------------------------------------------|
| PK: registry-user:<registry_id>   	 | str      | Primary Key = registry-user:<registry_id> |
| SK: user:<user_id>   	              | str      |                                           |
| date_created                        | int      | Date user was created in the registry     |
| first_name                          | str      |                                           |
| last_name                           | str      |                                           |
| role                                | UserRole |                                           |
| is_admin                            | UserRole |                                           |


## User Email

This table is used to lookup a user by email. This is used to find a user when they are invited to a registry.

| Columns 	                  | Type | Notes |
|----------------------------|------|---|
| PK: user-email:<email>   	 | str  | Primary Key = user-email:<email> |
| SK: user_id   	            | str  |  |
| email                      | str  |  |
| date_created               | int  |  |



## User Registry

This table is used to lookup a user by registry. This is used to find all users that are part of a registry.

| Columns 	                  | Type | Notes |
|----------------------------|------|---|
| PK: user-registry:<user_id>   	 | str  | Primary Key = user-registry:<user_id> |
| SK: registry:<registry_id>   	    | str  |  |
| date_created               | int  |  |


## User Invite

[!WARNING]
> Do we need to store the first_name, and last_name here? We can update it once the user accepts the invite.

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

