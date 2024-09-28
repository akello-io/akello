import uvicorn

from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from supertokens_python import init, get_all_cors_headers
from supertokens_python.framework.fastapi import get_middleware
from supertokens_python.recipe.session import SessionContainer
from supertokens_python.recipe.session.framework.fastapi import verify_session
from supertokens_python.recipe.multitenancy.asyncio import list_all_tenants

import config

init(
    supertokens_config=config.supertokens_config,
    app_info=config.app_info,
    framework=config.framework,
    recipe_list=config.recipe_list,
    mode="asgi",
)


app = FastAPI(title="SuperTokens example")
app.add_middleware(get_middleware())

@app.get("/sessioninfo")    
async def secure_api(s: SessionContainer = Depends(verify_session())):
    return {
        "sessionHandle": s.get_handle(),
        "userId": s.get_user_id(),
        "accessTokenPayload": s.get_access_token_payload(),
    }

@app.get("/tenants")
async def get_tenants():
    tenantReponse = await list_all_tenants()

    tenantsList = []

    for tenant in tenantReponse.tenants:
        tenantsList.append(tenant.to_json())

    return {
        "status": "OK",
        "tenants": tenantsList,
    }


app = CORSMiddleware(
    app=app,
    allow_origins=[config.app_info.website_domain],
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type"] + get_all_cors_headers(),
)