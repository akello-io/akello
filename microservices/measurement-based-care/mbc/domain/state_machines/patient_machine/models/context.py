from pydantic import BaseModel


# Context object used for LLM's later
class Context(BaseModel):
    author_id: str
    message: str


