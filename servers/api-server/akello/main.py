import os, sys
from fastapi import FastAPI
from akello.settings import *
from akello.api.v1.api import router as api_router
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


# Initialize the FastAPI app for a simple web server
app = FastAPI()

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

app = FastAPI(docs_url="/docs")

app.include_router(api_router, prefix="/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "api.akello.io"}


handler = Mangum(app)
handler = logger.inject_lambda_context(handler, clear_state=True)

logger.info('Loaded')
