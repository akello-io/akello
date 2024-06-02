import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient

from mbc.adapters import patch_registry_query_service
from mbc.domain.model.registry import RegistryUser
from mbc.entrypoints.api.main import app

client = TestClient(app)



class TestPatientEndpoint(unittest.TestCase):

    @patch(f'{patch_registry_query_service}.get_registry_user')
    def test_get_patient(self, mock_get_patient):
        registry_id = "123"
        patient_id = "456"

        registry_user = RegistryUser(
            registry_id=registry_id,
            user_id=patient_id,
            role="patient",
            state="active",
            flags={"flag": True},
            created_at=1234567890.1234567890,
            is_enabled=True
        )
        mock_get_patient.return_value = registry_user
        response = client.get(f"/v1/registry/{registry_id}/patient/{patient_id}")
        assert response.status_code == 200
        assert RegistryUser(**response.json()) == registry_user
