"""
import typer
from akello.commands.generate_mock_demo_registry import generate_registry
from akello.db.connector.dynamodb import drop_tables
from akello.services.admin import AdminService
from datetime import datetime
app = typer.Typer()


@app.command()
def mock_registry(name: str, patient_count: int = 100):
    generate_registry(name, patient_count=patient_count)

@app.command()
def drop_db_tables():
    drop_tables()

@app.command()
def scan_akello_stats():
    users = AdminService.scan_users()
    registries = AdminService.scan_registry()
    user_registries = AdminService.scan_user_registeries()

    user_registeries_stat = {}
    for user_registry in user_registries:
        if user_registry['user_id'] not in user_registeries_stat:
            user_registeries_stat[user_registry['user_id']] = 0
        user_registeries_stat[user_registry['user_id']] += 1

    print('-------------Akello Stats-----------------')
    print('total users: %s' % len(users))
    print('total registries: %s' % len(registries))
    print('Email,Registries,Last Login')
    for user in users:

        date = datetime.fromtimestamp(int(user['last_login']))
        # user_registeries_stat[user['user_id']]
        date_str = '%s-%s-%s' % (date.month, date.day, date.year)
        print('%s,%s,%s' % (user['email'], user_registeries_stat[user['partition_key'].split('user:')[1]],  date_str))


if __name__ == "__main__":
    app()

"""








import os, random
from akello.management.commands.mock.registry import RegistryMock
from akello.management.commands.mock.user import UserMock
from akello.management.commands.mock.patient import PatientMock
from akello.services.screeners import ScreenerService
from akello.services.user import UserService
from akello.services.registry import RegistryService
from akello.db.connector.dynamodb import client, dynamodb
from akello.db.models import UserInvite, UserRole, UserRegistry, ContactTypes

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


"""
for b in range(100):
    mock_patient = PatientMock().create_patient(registry_id)
    registry.refer_patient(mock_patient)


    registry.add_treatment_log(patient_registry=mock_patient, contact_type=ContactTypes.initial_assessment,  weeks_in_treatment=0)
    for i in range(1, 8):
        random_contact_type = random.choices(population=[ContactTypes.follow_up, ContactTypes.psychiatric_consultation], weights=[0.9, 0.1], k=1)[0]
        registry.add_treatment_log(patient_registry=mock_patient, contact_type=random_contact_type,  weeks_in_treatment=i)
    registry.add_treatment_log(patient_registry=mock_patient, contact_type=ContactTypes.relapse_prevention,  weeks_in_treatment=i)    
"""