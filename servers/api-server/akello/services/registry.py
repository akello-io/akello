import os, datetime, random, uuid, json
from decimal import Decimal
from akello.dynamodb.models.registry import RegistryModel, TreatmentLog, PatientRegistry
from akello.dynamodb import registry_db
from akello.services import BaseService
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from akello.integrations.metriport.api import Organization, Facility, Patient, Document



class RegistryService(BaseService):

    # TODO: We need decorator for permissions
    # TODO: We need to add logging
    # TODO: required roles: ['create registry']
    # the user object should be a validated one. Meaning there is no way its directly
    # from a web request where a user can set their roles
    @staticmethod
    def create_registry(name, questionnaires, integrations, logo_url=None):
        current_timestamp = datetime.datetime.utcnow().timestamp()
        rd = random.Random()

        registry = RegistryModel(
            id=str(uuid.UUID(int=rd.getrandbits(128))),
            name=name,
            questionnaires=questionnaires,
            integrations=integrations,
            logo_url=logo_url,
            modified_date=current_timestamp,
            created_date=current_timestamp,
        )

        # TODO: Need to generate the Item Object using the data model
        item = json.loads(json.dumps(registry.model_dump_json()), parse_float=Decimal)
        item = json.loads(item, parse_float=Decimal)
        item['partition_key'] = 'registry:%s' % item['id']
        item['sort_key'] = 'metadata'

        response = registry_db.put_item(
            Item=item
        )

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
        return item['id']

    @staticmethod
    def get_registry(registry_id):

        try:
            response = registry_db.get_item(
                Key={
                    'partition_key': 'registry:%s' % registry_id,
                    'sort_key': 'metadata'
                }
            )
            print(response)
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        return response['Item']

    @staticmethod
    def update_stats(registry_id):
        patients = RegistryService.get_patients(registry_id)
        members = RegistryService.get_members(registry_id)
        RegistryModel.set_attribute('registry:%s' % registry_id, 'metadata', 'members', len(members))
        RegistryModel.set_attribute('registry:%s' % registry_id, 'metadata', 'active_patients', len(patients))


    @staticmethod
    def get_patient(registry_id, patient_id):
        try:
            response = registry_db.get_item(
                Key={
                    'partition_key': 'registry-patient:%s' % registry_id,
                    'sort_key': patient_id
                }
            )
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        return response['Item']

    @staticmethod
    def get_patients(registry_id, flag=None):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('registry-patient:%s' % registry_id))
        except ClientError as e:
            print(e)
            print(e.response['No item found'])
        else:
            return response['Items']

    @staticmethod
    def refer_patient(patient_registry: PatientRegistry):
        item = patient_registry.toJson()

        item = json.loads(json.dumps(item), parse_float=Decimal)
        item['partition_key'] = patient_registry.partition_key
        item['sort_key'] = patient_registry.sort_key
        response = registry_db.put_item(
            Item=item
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        #TODO: If Metriport is integrated then make a document query request for the patient
        api_key = os.getenv('METRIPORT_API_KEY', None)
        api_url = os.getenv('METRIPORT_API_URL', None)
        if api_key and api_url:
            patient = Patient(api_key=api_key, api_url=api_url)
            resp = patient.start_fhir_consolidated_data_query(patient_registry.patient_mrn, patient_registry.id)
            assert resp.status_code == 200 or resp.status_code == 404

    @staticmethod
    def update_patient(patient_registry: PatientRegistry):
        item = patient_registry.toJson()

        item = json.loads(json.dumps(item), parse_float=Decimal)
        item['partition_key'] = patient_registry.partition_key
        item['sort_key'] = patient_registry.sort_key
        response = registry_db.put_item(
            Item=item
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200


    @staticmethod
    def add_treatment_log(registry_id, sort_key, treatment_log: TreatmentLog):

        UpdateExpression = "SET #att_name = list_append(#att_name, :treatment_logs), " \
                           "flag = :flag," \
                           "no_show = :no_show," \
                           "initial_assessment = :initial_assessment, " \
                           "last_follow_up = :last_follow_up, " \
                           "last_psychiatric_consult = :last_psychiatric_consult, " \
                           "relapse_prevention_plan = :relapse_prevention_plan, " \
                           "weeks_since_initial_assessment = :weeks_since_initial_assessment "

        ExpressionAttributeValues = {
            ':treatment_logs': [json.loads(treatment_log.model_dump_json(), parse_float=Decimal)],
            ':flag': treatment_log.flag,
            ':no_show': treatment_log.no_show,
            ':initial_assessment': Decimal(treatment_log.date),
            ':last_follow_up': Decimal(treatment_log.date),
            ":last_psychiatric_consult": Decimal(treatment_log.date),
            ":relapse_prevention_plan": Decimal(treatment_log.date),
            ":weeks_since_initial_assessment": 0
        }

        response = registry_db.update_item(
            Key={
                'partition_key': 'registry-patient:%s' % registry_id,
                'sort_key': sort_key
            },
            UpdateExpression=UpdateExpression,
            ExpressionAttributeNames={
                "#att_name": "treatment_logs",
            },
            ExpressionAttributeValues=ExpressionAttributeValues,
            ReturnValues="UPDATED_NEW"
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200


    @staticmethod
    def get_members(registry_id):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('registry-user:%s' % registry_id)
            )
            return response['Items']
        except ClientError as e:
            print(e)