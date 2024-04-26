from fastapi import FastAPI
from pydantic import BaseModel, EmailStr



class ReferPatient(BaseModel):
    user_id: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "user_id": "<user_id:1>",
                }
            ]
        }
    }