import logging
from fastapi import APIRouter, Depends
from akello.services.user import  UserService
from akello.auth.provider import auth_token_check
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.services.reports import ReportsService


logger = logging.getLogger('mangum')
router = APIRouter()

@router.get("/{registry_id}/billing")
async def billing_report_monthly(registry_id: str, from_date: int, to_date: int, auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    data = ReportsService.get_billing_report(registry_id, from_date, to_date)
    return data

@router.get("/{registry_id}/dashboard-stats")
async def get_registry_stats(registry_id: str, from_date: int, to_date: int, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry_access = UserService.check_registry_access(auth.cognito_id, registry_id)
    return ReportsService.get_registry_dashboard(registry_id, from_date, to_date)
