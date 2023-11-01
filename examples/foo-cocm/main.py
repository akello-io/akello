from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from akello.api.v1.api import router as api_router
from mangum import Mangum
from aws_lambda_powertools import Logger
from akello.dynamodb import *
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}