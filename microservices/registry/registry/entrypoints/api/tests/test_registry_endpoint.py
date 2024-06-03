import os
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient

from registry.domain.model.registry import Registry
from registry.entrypoints.api.main import app
from registry.adapters import patch_registry_query_service
from registry.adapters import patch_unit_of_work

client = TestClient(app)


class TestRegistryEndpoint(unittest.TestCase):

    @patch(f'{patch_unit_of_work}.commit')
    def test_create_registry(self, mock_create_registry):
        mock_create_registry.return_value = None
        response = client.post("/v1/registry", json={
            "name": "Test Registry",
            "description": "This is a test registry"
        })
        assert response.status_code == 200
        assert response.json() == True

    @patch(f'{patch_registry_query_service}.get_registry')
    def test_get_registry(self, mock_get_registry):
        registry = Registry(id="123", name="Test Registry", description="This is a test registry",
                            created_at=1234567890.1234567890)
        mock_get_registry.return_value = registry
        response = client.get("/v1/registry/123")
        assert response.status_code == 200
        assert Registry(**response.json()) == registry

    @patch(f'{patch_unit_of_work}.commit')
    def test_update_registry(self, mock_update_registry):
        mock_update_registry.return_value = None
        response = client.put("/v1/registry/123", json={
            "name": "Test Registry",
            "description": "This is a test registry"
        })
        assert response.status_code == 200
