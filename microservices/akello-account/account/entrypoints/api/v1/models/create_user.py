from pydantic import BaseModel, Field


class CreateUser(BaseModel):
    name: str = Field(..., title="Name of the user", description="Name of the user")
    email: str = Field(..., title="Email of the user", description="Email of the user")
