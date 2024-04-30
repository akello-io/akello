from fastapi import FastAPI
from pydantic import BaseModel, EmailStr



class CreateRegistry(BaseModel):
    name: str
    description: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Depression",
                    "description": "Registry for Depression clinic",
                    "workflow": {
                          "organization_users": [
                            {
                              "user_id": "<user_id:1>",
                              "role": "care_manager"
                            },
                            {
                              "user_id": "<user_id:2>",
                              "role": "care_manager"
                            },
                            {
                              "user_id": "<user_id:2>",
                              "role": "primary_care_provider"
                            },
                            {
                              "user_id": "<user_id:3>",
                              "role": "psychiatrist"
                            },
                            {
                              "user_id": "<user_id:3>",
                              "role": "clinical_ops"
                            }
                          ],
                          "intervention": {
                            "intervention_category_types": [
                              {
                                "id": "caseload_review",
                                "name": "Caseload Review",
                              },
                              {
                                "id": "registry_review",
                                "name": "Registry Review"
                              },
                              {
                                "id": "brief_intervention",
                                "name": "Brief Intervention"
                              }
                            ],
                            "intervention_types": [
                              {
                                "id": "initial_assessment",
                                "name": "Initial Assessment"
                              },
                              {
                                "id": "follow_up",
                                "name": "Follow Up"
                              },
                              {
                                "id": "psychiatric_consultation",
                                "name": "Psychiatric Consultation"
                              }
                            ]
                          },
                          "state_machine": {
                            "name": "CoCMPatient",
                            "states": [
                              "referral",
                              "initial_assessment",
                              "treatment",
                              "graduation",
                              "relapse_prevention",
                              "discharge"
                            ],
                            "transitions": [
                              {
                                "trigger": "accept_to_program",
                                "source": "referral",
                                "dest": "initial_assessment"
                              },
                              {
                                "trigger": "start_treatment",
                                "source": "initial_assessment",
                                "dest": "treatment"
                              },
                              {
                                "trigger": "graduate",
                                "source": "treatment",
                                "dest": "graduation"
                              },
                              {
                                "trigger": "relapse_prevention",
                                "source": "graduation",
                                "dest": "relapse_prevention"
                              },
                              {
                                "trigger": "discharge",
                                "source": "*",
                                "dest": "discharge"
                              }
                            ]
                          }
                        }

                }
            ]
        }
    }