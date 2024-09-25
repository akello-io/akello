from fastapi import APIRouter, Depends
from fastapi_cognito import CognitoToken

from pydantic import BaseModel

from typing import Optional, Dict
from auth.entrypoints.api import config
from auth.entrypoints.api.config import cognito_us


router = APIRouter()
app_config = config.AppConfig(**config.config)



# Pydantic Models
class AuthRequest(BaseModel):
    username: str
    password: str

class AuthResponse(BaseModel):
    token: str

class AssumeRoleRequest(BaseModel):
    roleArn: str

class AssumeRoleResponse(BaseModel):
    accessKeyId: str
    secretAccessKey: str
    sessionToken: str
    expiration: str

class VerifyTokenRequest(BaseModel):
    token: str

class VerifyTokenResponse(BaseModel):
    valid: bool
    claims: Optional[Dict[str, str]] = None

class UserDetailsResponse(BaseModel):
    username: str
    roles: list
    permissions: list

# Mock JWT generation and verification (replace with real logic)
def create_jwt(username: str) -> str:
    return f"mock-jwt-for-{username}"

def verify_jwt(token: str) -> bool:
    return token.startswith("mock-jwt")

# Endpoint: Authenticate user
@router.post("/auth/login", response_model=AuthResponse)
async def login(auth_request: AuthRequest):
    user = users_db.get(auth_request.username)
    if not user or user["password"] != auth_request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_jwt(auth_request.username)
    return AuthResponse(token=token)

# Endpoint: Assume AWS Role
@router.post("/auth/assume-role", response_model=AssumeRoleResponse)
async def assume_role(assume_role_request: AssumeRoleRequest, token: str = Depends(create_jwt)):
    # Validate the token (assuming a simple mock validation here)
    if not verify_jwt(token):
        raise HTTPException(status_code=403, detail="Invalid or expired token")

    # Call AWS STS to assume role
    sts_client = boto3.client('sts')
    assumed_role_object = sts_client.assume_role(
        RoleArn=assume_role_request.roleArn,
        RoleSessionName="example-session"
    )

    credentials = assumed_role_object['Credentials']

    return AssumeRoleResponse(
        accessKeyId=credentials['AccessKeyId'],
        secretAccessKey=credentials['SecretAccessKey'],
        sessionToken=credentials['SessionToken'],
        expiration=str(credentials['Expiration'])
    )

# Endpoint: Verify Token
@router.post("/auth/verify-token", response_model=VerifyTokenResponse)
async def verify_token(request: VerifyTokenRequest):
    is_valid = verify_jwt(request.token)
    return VerifyTokenResponse(valid=is_valid, claims={"username": "testuser"} if is_valid else None)

# Endpoint: Get User Details
@router.get("/auth/user-details", response_model=UserDetailsResponse)
async def get_user_details(token: str = Depends(create_jwt)):
    # Mock validation and user details retrieval
    if not verify_jwt(token):
        raise HTTPException(status_code=403, detail="Invalid or expired token")

    return UserDetailsResponse(
        username="testuser",
        roles=["admin", "user"],
        permissions=["dynamodb:read", "dynamodb:write"]
    )