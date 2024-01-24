from fastapi import APIRouter

import logging

logger = logging.getLogger('mangum')
router = APIRouter()


@router.post("/integrations/metriport/webhook")
async def metriport_webhook():
    pass