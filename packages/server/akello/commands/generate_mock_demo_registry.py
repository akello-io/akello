import random
from faker import Faker
from datetime import datetime
from akello.services.registry import RegistryService
from akello.dynamodb.models.registry import PatientRegistry, TreatmentLog, ContactTypes, VisitTypes, FlagTypes, PatientStatysTypes
from akello.dynamodb.models.user import UserInvite, UserRole
from akello.dynamodb import drop_tables, create_tables


fake = Faker()
Faker.seed(0)

def generate_patient_registry(registry_id):
    patient = PatientRegistry(
        id=registry_id,
        patient_flag=random.choice([None, FlagTypes.needs_discussion, FlagTypes.review_with_psychiatrist, FlagTypes.safety_risk]),
        patient_mrn=fake.uuid4(),
        date_created=fake.unix_time(),
        date_graduated=fake.unix_time(),
        date_modified=fake.unix_time(),
        status=random.choice([
            PatientStatysTypes.enrolled, PatientStatysTypes.treatment,
            PatientStatysTypes.relapse_prevention_plan,
            PatientStatysTypes.deactivated,
        ]),
        payer=random.choice([
            'Medicare',
            'Medicaid',
            'Commercial CoCM OK',
            'Commercial CoCM Not OK'
        ]),
        first_name=fake.unique.first_name(),
        last_name=fake.unique.last_name(),
        phone_number=fake.phone_number(),
        email=fake.email(),
        date_of_birth=fake.date()
    )
    return patient


def generate_registry(name, patient_count=10):
    # drop_tables()
    # create_tables()

    registry_id = RegistryService.create_registry(name)
    UserInvite.create(
        cognito_user_id='system',
        email='vijay.selvaraj@gmail.com',
        role=UserRole.care_manager,
        registry_id=registry_id
    )
    UserInvite.create(
        cognito_user_id='system',
        email='vijay@akellohealth.com',
        role=UserRole.primary_care_physician,
        registry_id=registry_id
    )

    for i in range(patient_count):
        patient_registry = generate_patient_registry(registry_id)
        RegistryService.refer_patient(patient_registry)

        random_date = fake.date_between_dates(date_start=datetime(2015, 1, 1), date_end=datetime(2019, 12, 31))
        dt = datetime.combine(random_date, datetime.min.time())

        treatment_log = TreatmentLog(
            patient_mrn=patient_registry.patient_mrn,
            contact_type=ContactTypes.initial_assessment,
            weeks_in_treatment=random.randint(0, 32),
            visit_type=VisitTypes.phone,
            phq9_score=random.randint(0, 27),
            gad7_score=random.randint(0, 21),
            minutes=random.randint(0, 15),
            date=dt.timestamp()
        )
        RegistryService.add_treatment_log(registry_id, treatment_log.patient_mrn, treatment_log)

        for b in range(30):
            random_date = fake.date_between_dates(date_start=datetime(2015, 1, 1), date_end=datetime(2019, 12, 31))
            dt = datetime.combine(random_date, datetime.min.time())

            treatment_log = TreatmentLog(
                patient_mrn=patient_registry.patient_mrn,
                contact_type=random.choice([ContactTypes.follow_up, ContactTypes.relapse_prevention,
                                            ContactTypes.psychiatric_consultation]),
                weeks_in_treatment=random.randint(0, 32),
                visit_type=VisitTypes.phone,
                phq9_score=random.randint(0, 27),
                gad7_score=random.randint(0, 21),
                minutes=random.randint(0, 15),
                date=dt.timestamp()
            )

            RegistryService.add_treatment_log(registry_id, treatment_log.patient_mrn, treatment_log)

    RegistryService.update_stats(registry_id)



def generate_members():
    """
    first_name
    last_name
    role
    profile_photo
    :return:
    """
    pass

def generate_treatment_session():
    """
    visit type
    session
    flag
    PHQ-9
    GAD-7
    :return:
    """
    pass

def generate_patients():
    """
    first_name
    last_name
    email
    phone
    :return:
    """
    pass