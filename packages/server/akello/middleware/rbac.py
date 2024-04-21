from fastapi import FastAPI, HTTPException, Request
from starlette.middleware.base import BaseHTTPMiddleware
from akello.auth.aws_cognito.aws_cognito import auth_provider
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.db.models.registry import Registry, RegistryUser

app = FastAPI()


# Define role-based access control (RBAC) structure
RESOURCES_FOR_ROLES = {
    'admin': {
        'measurement': ['read', 'write', 'delete'],
        'organization': ['read', 'write'],
        'patient': ['read', 'write'],
        'registry': ['read', 'write'],
        'user': ['read', 'write'],
    },
    'care-manager': {
        'measurement': ['read', 'write', 'delete'],
        'organization': ['read', 'write'],
        'patient': ['read', 'write'],
        'registry': ['read', 'write'],
        'user': ['read', 'write'],
    },
    'psychiatrist': {
        'measurement': ['read', 'write', 'delete'],
        'organization': ['read', 'write'],
        'patient': ['read', 'write'],
        'registry': ['read', 'write'],
        'user': ['read', 'write'],
    },
    'physician': {
        'measurement': ['read', 'write', 'delete'],
        'organization': ['read', 'write'],
        'patient': ['read', 'write'],
        'registry': ['read', 'write'],
        'user': ['read', 'write'],
    },
    'patient': {
        'measurement': ['read', 'write', 'delete'],
        'organization': ['read', 'write'],
        'patient': ['read', 'write'],
        'registry': ['read', 'write'],
        'user': ['read', 'write'],
    },

}


# Optionally, define paths to be excluded from checking for permissions
EXLUDED_PATHS = ['docs', 'openapi.json']


# Map request methods to actions
def translate_method_to_action(method: str) -> str:
    method_permission_mapping = {'GET': 'read', 'POST': 'write', 'PUT': 'delete', 'DELETE': 'delete', }
    return method_permission_mapping.get(method.upper(), 'read')


# CHeck if permission granted or not
def has_permission(user_role, resource_name, required_permission):
    if user_role in RESOURCES_FOR_ROLES and resource_name in RESOURCES_FOR_ROLES[user_role]:
        return required_permission in RESOURCES_FOR_ROLES[user_role][resource_name]
    return False


# Define a custom Middleware for handling RBAC
class RBACMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_method = str(request.method).upper()
        #action = translate_method_to_action(request_method)
        resource = request.url.path.split('/')[2]

        auth_user:CognitoTokenCustom = await auth_provider.auth_required(request)
        user_id = auth_user.cognito_id

        if resource == 'registry':
            registry_id = request.url.path.split('/')[3]
            registry_user = RegistryUser.get_by_key(RegistryUser, 'registry-id:%s' % registry_id, 'user-id:%s' % user_id)
            if not registry_user:
                raise Exception('User does not have access to this registry')

        """
        if resource not in EXLUDED_PATHS:
            admin1 = USERS['admin1']  # Switch between user and admin by commenting out this or the next line
            # user1 = USERS['user1']
            if not has_permission(admin1['role'], resource, action):
                raise HTTPException(status_code=403, detail="Insufficient permissions")        
        """

        response = await call_next(request)
        return response
