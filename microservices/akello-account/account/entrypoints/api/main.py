from aws_lambda_powertools import Logger
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum


logger = Logger(service="mangum")

app = FastAPI(
    title="Akello",
    description="API for Account Microservice",
    version="1.0",
    docs_url='/docs',
    openapi_url='/openapi.json',
    redoc_url=None
)


@app.get("/")
def root():
    return {"message": "Account Microservice"}


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
