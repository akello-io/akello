import json
import logging
from fastapi import APIRouter

logger = logging.getLogger('mangum')
router = APIRouter()



@router.post("/")
async def typeform_webhook(payload: dict):
    print("received typeform webhook call")
    print("-----------------------------------")
    print(json.dumps(payload, indent=4))
    print("-----------------------------------")


