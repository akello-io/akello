from fastapi import APIRouter, Depends


router = APIRouter()

@router.get("/")
async def test():
    return {"message": "Hello World"}
