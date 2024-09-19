from pydantic import BaseModel



class UpdateRegistry(BaseModel):
    name: str
    description: str

