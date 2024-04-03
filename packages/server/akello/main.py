import os, sys
from fastapi import FastAPI
from akello.settings import *
from akello.api.app.v1.api import router as api_router
#from akello_apps.metriport.webhooks.metriport_webhook import router as metriport_webhook
#from akello_apps.typeform.webhooks.typeform_webhook import router as typeform_webhook
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from aws_lambda_powertools import Logger
from pydantic_settings import BaseSettings

logger = Logger(service="mangum")




class Settings(BaseSettings):
    BASE_URL: str  = "http://localhost:8000"
    USE_NGROK: bool = os.environ.get("USE_NGROK", "False") == "True"

settings = Settings()

def init_webhooks(base_url):
    # Update inbound traffic via APIs to use the public-facing ngrok URL
    pass


if settings.USE_NGROK and os.environ.get("NGROK_AUTHTOKEN"):
    # pyngrok should only ever be installed or initialized in a dev environment when this flag is set
    from pyngrok import ngrok

    # Get the dev server port (defaults to 8000 for Uvicorn, can be overridden with `--port`
    # when starting the server
    port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else "8000"

    # Open a ngrok tunnel to the dev server
    public_url = ngrok.connect(port).public_url
    logger.info("ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

    # Update any base URLs or webhooks to use the public ngrok URL
    settings.BASE_URL = public_url
    init_webhooks(public_url)


app = FastAPI(
    title="Akello",
    description="API's for all of Akello's core services",
    version="1.0",
    docs_url='/docs',
    openapi_url='/openapi.json',
    redoc_url=None
)

@app.get("/")
def root():
    return {"message": "api.akello.io"}


app.include_router(api_router, prefix="/v1")

#TODO: Should be implemented by apps that extend the base server
#metriport_api_key = os.getenv('METRIPORT_API_KEY', None)
#metriport_api_url = os.getenv('METRIPORT_API_URL', None)
#if metriport_api_key != '$METRIPORT_API_KEY' and metriport_api_url != '$METRIPORT_API_URL' and metriport_api_key and metriport_api_url:
#app.include_router(metriport_webhook, prefix="/v1/integrations/metriport", tags=["Integrations"])
#app.include_router(typeform_webhook, prefix="/v1/integrations/typeform", tags=["Integrations"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

handler = Mangum(app)
handler = logger.inject_lambda_context(handler, clear_state=True)

logger.info('Loaded')
