from fastapi import APIRouter
from account.entrypoints.api.v1.endpoints.user import router as user_router
from account.entrypoints.api.v1.endpoints.account import router as account_router

router = APIRouter()

router.include_router(user_router, prefix="/user", tags=["user"])
router.include_router(account_router, prefix="/account", tags=["account"])
