from akello.db.models import UserModel, RegistryModel, RegistryUser, UserRole, PatientRegistry, ContactTypes, VisitTypes, FlagTypes, PatientStatysTypes, TreatmentLog, TreatmentLogScore,  EventLog, AuditLog
from akello.services.screeners import ScreenerService
from akello.services.user import UserService
import random
from faker import Faker
from datetime import datetime


fake = Faker()
Faker.seed(0)

# create the registry object and set a name
# -- attach questionnaires


total_patients = 1000
team_members = 10

screeners = ScreenerService.get_screeners()
screeners = [screener for screener in screeners if screener['type'] == 'survey']


admin_user_id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

def create_registry():    
    registry = RegistryModel(
        id=fake.uuid4(),
        name='',
        description='',
        modified_date=0,
        created_date=0,
        members=team_members,
        active_patients=total_patients,
        questionnaires=screeners,
        integrations=[],
        logo_url='',
    )


def create_user():
    user = UserModel(
        cognito_user_id='',
        email='',
        first_name='',
        last_name='',
        phone_number='',
        registries=[]
    )
    UserService.create_user(user.cognito_user_id, user.email)


def add_user_to_registry(registry, user:UserModel, role:UserRole, is_admin:bool):    
    UserService.create_registry_user(registry.id, user.first_name, user.last_name, user.email, user.cognito_user_id, role, is_admin)
    

def add_random_users_to_registry(registry, total_users): 
    team_roles = [UserRole.care_manager, UserRole.primary_care_physician, UserRole.consulting_psychiatrist, UserRole.clinical_ops, UserRole.finance]
    # select random team_roles
    for i in range(total_users):
        RegistryUser(
            registry_id=registry.id,
            user_id=fake.uuid4(),
            date_created=0,
            first_name=fake.unique.first_name(),
            last_name=fake.unique.last_name(),
            email=fake.email(),
            role=random.choice(team_roles),
            is_admin=False,
        )    

def generate_treatment_log_scores():
    pass


def generate_treatment_logs():
    treatment_log = TreatmentLog(
        id='',
        patient_mrn='',
        provider='',                
        weeks_in_treatment=3,
        contact_type=ContactTypes.phone,
        visit_type=VisitTypes.follow_up,
        scores=generate_treatment_log_scores(),
        minutes=0,        
        date=0
    )
    return treatment_log

def create_patient_registry():

    # Generate xxx patients
    PatientRegistry(
        id='',
        patient_flag=None,
        patient_mrn='',
        date_created=0,
        date_graduated=None,
        date_modified=0,
        payer='',
        first_name='',
        last_name='',
        phone_number='',
        email='',
        date_of_birth='',
        treatment_logs=generate_treatment_logs(),
        event_logs=[],
        audit_logs=[],
        flags=[],
        status=None,
        initial_assessment=None,
        last_follow_up=None,
        last_psychiatric_consult=None,
        relapse_prevention_plan=None,
        total_sessions=0,
        weeks_since_initial_assessment=0,
        minutes_this_month=0        
    )




