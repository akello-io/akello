import typer
import os, random
from commands.mock.registry import RegistryMock
from commands.mock.user import UserMock
from commands.mock.patient import PatientMock
from akello.services.screeners import ScreenerService
from akello.services.user import UserService
from akello.services.registry import RegistryService
from akello.db.connector.dynamodb import client, dynamodb
from akello.db.models import UserInvite, UserRole, UserRegistry, ContactTypes
import shutil, errno

app = typer.Typer()




@app.command("create-app")
def create_app(name: str):
    print('Creating akello-app %s' % name)
    try:
        shutil.copytree('./akello_apps/_template_app', './akello_apps/%s' % name)
    except OSError as exc: # python >2.5
        if exc.errno in (errno.ENOTDIR, errno.EINVAL):
            shutil.copy(src, dst)
        else: raise


@app.command('mock_registry')
def mock_registry():
    DYNAMODB_TABLE = os.getenv('AWS_DYNAMODB_TABLE')
    client.delete_table(TableName=DYNAMODB_TABLE)

    table = dynamodb.create_table(
        TableName=DYNAMODB_TABLE,
        KeySchema=[
            {
                'AttributeName': 'partition_key',  # registry_id, auth_user_id
                'KeyType': 'HASH'
            },
            {
                'AttributeName': 'sort_key',
                'KeyType': 'RANGE'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'partition_key',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'sort_key',
                'AttributeType': 'S'
            },
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )

    screeners = ScreenerService.get_screeners()
    registry = RegistryMock()
    registry_id = registry.create_registry(name='Test Registry', description='Test Description', questionnaires=screeners)

    UserInvite.create(
            cognito_user_id='system',
            email='vijay.selvaraj@gmail.com',
            role=UserRole.care_manager,
            registry_id=registry_id
    )


    UserService.create_registry_user(registry_id=registry_id, first_name='Vijay1', last_name='Selvaraj', email='v1@t.com', user_id='3', role=UserRole.care_manager, is_admin=False)
    UserService.create_registry_user(registry_id=registry_id, first_name='Vijay2', last_name='Selvaraj',  email='v2@t.com', user_id='2',role=UserRole.care_manager, is_admin=False)
    UserService.create_registry_user(registry_id=registry_id, first_name='Vijay3', last_name='Selvaraj', email='v3@t.com', user_id='1', role=UserRole.care_manager, is_admin=False)


    for b in range(100):
        pm = PatientMock(registry_id=registry_id)
        registry.refer_patient(pm.patient_registry)
        for treatment_log in pm.treatment_logs:
            print(len(pm.treatment_logs))
            RegistryService.add_treatment_log(pm.patient_registry.id, pm.patient_registry.patient_mrn, treatment_log)


if __name__ == "__main__":
    app()