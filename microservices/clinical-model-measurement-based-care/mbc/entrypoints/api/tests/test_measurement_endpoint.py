import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient

from mbc.adapters import patch_measurement_unit_of_work
from mbc.entrypoints.api.main import app

client = TestClient(app)


class TestMeasurementEndpoint(unittest.TestCase):

    @patch(f'{patch_measurement_unit_of_work}.commit')
    def test_add_measurement(self, mock_unit_of_work_commit):
        mock_unit_of_work_commit.return_value = None

        registry_id= "123"
        patient_id= "456"
        measurement = {
            "measurement_id": "789",
            "label": "Test Measurement",
            "value": 123,
            "measured_at": 1234567890.1234567890
        }
        response = client.post(f"/v1/registry/{registry_id}/patient/{patient_id}/measurement/", json=measurement)
        assert response.status_code == 200