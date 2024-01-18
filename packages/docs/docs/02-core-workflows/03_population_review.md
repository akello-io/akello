---
sidebar_position: 3
---

# Population Review


## Registry Data Fields (non scores)


| Field 	               | Description                                                                      |
|-----------------------|----------------------------------------------------------------------------------|
| Flag   	              | CoCM Flags                                                                       |
| MRN   	               | Unique medical record number for the patient                                     |
| First Name  	         | Patient's first name                                                             |
| Last Name  	          | Patient's last name                                                              |
| Status  	             | Treatment status                                                                 |
| I/A  	                | Date of most recent initial assessment                                           |
| F/U  	                | Date of the most recent Follow Up, excluding those marked as no patient contact. |
| P/C  	                | Date of most recent Psychiatric Consultation                                     |
| R/P  	                | Date of most recent Relapse Prevention Plan.                                     |
| # Session  	          | Total number of sessions for the patient                                         |
| Payer  	              | The insurance used by the patient                                                |
| Weeks Since I/A  	    | Total weeks since initial assessment                                             |
| Minutes this Month  	 | Total minutes this month                                                         |

## Screener Score Fields (scores)


| Field 	     | Description |
|-------------|-------------|
| Initial   	 |             |
| Last   	    |             |


## CoCM Flags

| Flag 	                   | Description                                                                      |
|--------------------------|----------------------------------------------------------------------------------|
| Needs Discussion         | Used to alert the team that patient needs to be reviewed during weekly CoCM sync |
| Review with Psychiatrist | Used by the Psychiatrist to review flagged patients                              |
| Safety Risk              | Alerts team that the patient is at risk                                          |

## Treatment Status

| Treatment Status 	          | Description                                                                                                             |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Enrolled   	                | Patient has been enrolled but treatment has not yet started                                                             |
| Treatment   	               | Patient is in active treatment                                                                                          |
| Relapse Prevention Plan   	 | Patient has graduated into relapse prevention. The team can use less frequent follows to stay in touch with the patient. |
| Deactivated   	             | Patient has been deactivated from the registry.                                                                         |