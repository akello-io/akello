from fastapi import FastAPI
from akello.settings import *
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from aws_lambda_powertools import Logger
from akello.dynamodb import *
from akello.api.v1.api import router as api_router


logger = Logger(service="mangum")


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
