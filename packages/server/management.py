import typer
import os, random
from commands.mock.registry import RegistryMock
from commands.mock.user import UserMock
from commands.mock.patient import PatientMock
from akello.services.screeners import ScreenerService
from akello.services.user import UserService
from akello.services.registry import RegistryService
from akello.db.connector.dynamodb import client, dynamodb
from akello.db.models import UserRole, UserRegistry
from akello.db.types import UserInvite, ContactTypes
from faker import Faker
import shutil, errno

fake = Faker()
Faker.seed(0)
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

    pediatrics_id = registry.create_registry(name='Pediatrics', description='Patients within the region of San Francisco', questionnaires=screeners)
    # adult_depression_id = registry.create_registry(name='Adult Moderate Depression & Anxiety', description='General SF Bay Area', questionnaires=screeners)
    # bipolar_id = registry.create_registry(name='Stanford University - Bipolar', description='Current students with Bipolar disorder', questionnaires=screeners)
    #postaprtum_id = registry.create_registry(name='Facebook/Google - Postpartum Depression', description='Employees with Postpartum Depression', questionnaires=screeners)


    for registry_id in [pediatrics_id]:
        UserInvite.create(
                cognito_user_id='system',
                email='vijay.selvaraj@gmail.com',
                role=UserRole.care_manager,
                registry_id=registry_id
        )

        for b in range(random.randint(3, 6)):
            UserService.create_registry_user(registry_id=registry_id, first_name=fake.first_name(), last_name=fake.last_name(), email=fake.email(), user_id=fake.uuid4(), role=UserRole.care_manager, is_admin=False)



        for b in range(random.randint(50, 300)):
            pm = PatientMock(registry_id=registry_id, referring_npi=fake.random.choice(['1234567890', '0987654321']))
            registry.refer_patient(pm.patient_registry)
            for treatment_log in pm.treatment_logs:
                print(len(pm.treatment_logs))
                RegistryService.add_treatment_log(pm.patient_registry.id, pm.patient_registry.patient_mrn, treatment_log)


if __name__ == "__main__":
    app()