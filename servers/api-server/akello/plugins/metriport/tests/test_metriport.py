import os
from unittest import TestCase, mock
from unittest.mock import patch
from akello.plugins.metriport import MetriportMixin
from akello.dynamodb.models.registry import PatientRegistry

class TestMetriportMixin(TestCase):
    
    def test_mixin(selfx):        
        id = '018ca636-5838-7560-b64f-0ea98d51b321'
        registry_id = 'c6dd885d-79ad-ab94-f648-af11e645d0b2'
        patient_registry = PatientRegistry(
            id=registry_id,
            patient_mrn=id,
            first_name='John',
            last_name='Doe',
            phone_number='123-456-7890',
            email='v@v.com',
            date_of_birth='01-01-1990'
        )
        mixin = MetriportMixin()
        resp = mixin.run(patient_registry=patient_registry)        
        print(resp)
