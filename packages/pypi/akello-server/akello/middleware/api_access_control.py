import json

from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.aws_cognito.aws_cognito import auth_provider
from akello.db.models.measurementvalue import MeasurementValue
from akello.db.models.registry import RegistryUser

app = FastAPI()


# Map request methods to actions
def translate_method_to_action(method: str) -> str:
    method_permission_mapping = {'GET': 'read', 'POST': 'write', 'PUT': 'delete', 'DELETE': 'delete', }
    return method_permission_mapping.get(method.upper(), 'read')


def has_access_to_registry(user_id: str, registry_id: str) -> bool:
    registry_user = RegistryUser.get_by_key(RegistryUser, 'registry-id:%s' % registry_id, 'user-id:%s' % user_id)
    return registry_user


# Define a custom Middleware for handling RBAC
class AccessControlMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_method = str(request.method).upper()
        # action = translate_method_to_action(request_method)
        resource = request.url.path.split('/')[2]

        auth_user: CognitoTokenCustom = await auth_provider.auth_required(request)
        user_id = auth_user.cognito_id

        if resource == 'measurement':
            if request_method == 'POST':
                body = await request.body()
                payload = json.loads(body)
                measurement_value = MeasurementValue(**payload)
            if request_method == 'GET':
                registry_id = request.query_params.get('registry_id')
                if not has_access_to_registry(user_id, registry_id):
                    raise Exception('User does not have access to this registry')

        if resource == 'organization':
            raise Exception('Not implemented yet')

        if resource == 'registry':
            registry_id = request.url.path.split('/')[3]
            if not has_access_to_registry(user_id, registry_id):
                raise Exception('User does not have access to this registry')

        if resource == 'patient':
            raise Exception('Not implemented yet')

        if resource == 'user':
            print('user has access to this resource since they will pulling data about themselves')

        response = await call_next(request)
        return response
