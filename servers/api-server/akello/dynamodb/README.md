


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
* PK: `registry-patient`
* SK: `patient_mrn`

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

