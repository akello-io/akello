


# DynamoDB Schema



| Columns 	           | Type       | Notes |
|---------------------|------------|-------|
| PK: registry   	    | str        |       |
| SK: registry-id   	 | str        |       |
| id  	               | str        |       |
| name                | str        |       |
| modified_date       | float      |       |
| created_date        | float      |       |
| members             | int        |       |
| active_patients     | int        |       |
| questionnaires      | List[dict] |       |


## Registry 
* PK: `registry`
* SK: `registry-id`


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

