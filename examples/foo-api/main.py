from fastapi import FastAPI
from mangum import Mangum
from akello.api.v1.api import router as api_router

app = FastAPI(docs_url="/docs")
app.include_router(api_router, prefix="/v1")

handler = Mangum(app)
