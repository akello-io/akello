import os, sys
from fastapi import FastAPI
from policy.entrypoints.api.v1.api import router as api_router
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from aws_lambda_powertools import Logger

logger = Logger(service="mangum")


app = FastAPI()

@app.get("/")
def root():
    return {"message": "Policy Microservice"}

app.include_router(api_router, prefix="/v1")

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
