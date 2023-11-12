import os
from akello.auth.aws_cognito.aws_cognito import auth_provider, local_auth_required


if os.getenv('AKELLO_ENV') == 'LOCAL':
    auth_token_check = local_auth_required
else: 
    auth_token_check = auth_provider.auth_required
