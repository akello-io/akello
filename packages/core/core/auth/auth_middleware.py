from fastapi import Request, HTTPException, Depends
from httpx import AsyncClient

AUTH_SERVICE_URL = "http://auth-service:3000"

async def validate_token(request: Request):
    auth_header = request.headers.get('Authorization')
    
    if auth_header is None or not auth_header.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = auth_header.split(" ")[1]
    
    async with AsyncClient() as client:
        response = await client.get(f"{AUTH_SERVICE_URL}/session/verify", params={"accessToken": token})
        
        if response.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        token_data = response.json()
        return token_data

def has_permission(required_role: str):
    async def role_checker(token_data: dict = Depends(validate_token)):
        if required_role not in token_data.get("roles", []):
            raise HTTPException(status_code=403, detail="Permission denied")
        return token_data
    return role_checker
