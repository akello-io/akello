from fastapi import APIRouter
from fastapi import Depends
from typing import List
from akello.dynamodb.models.financial_model import FinancialModel, load_db_model, load_client_model
from akello.auth_settings import cognito_us
from akello.auth_settings import CognitoTokenCustom
from akello.dynamodb.query import FinancialModelQuery

router = APIRouter()


@router.get("")
async def get_models(auth: CognitoTokenCustom = Depends(cognito_us.auth_required)) -> List[FinancialModel]:
    query = FinancialModelQuery()
    models = query.list(user_id=auth.cognito_id)
    # for model in models:
    return models


@router.get("/{model_name}")
async def get_model(model_name, auth: CognitoTokenCustom = Depends(cognito_us.auth_required)) -> List[FinancialModel]:
    query = FinancialModelQuery()
    models = query.get(user_id=auth.cognito_id, model_name=model_name)
    return models


@router.put("")
async def put_model(model: dict, auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    financial_model = load_client_model(model, auth.cognito_id)
    query = FinancialModelQuery()
    query.create_model(financial_model)


@router.post("")
async def create_model(model: dict, auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    financial_model = load_db_model(model, auth.cognito_id)
    query = FinancialModelQuery()
    query.create_model(financial_model)
