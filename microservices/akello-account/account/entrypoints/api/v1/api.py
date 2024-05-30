from fastapi import APIRouter
from account.entrypoints.api.v1.endpoints.user import router as user_router

router = APIRouter()

router.include_router(user_router, prefix="/user", tags=["user"])
