import unittest

from fastapi.testclient import TestClient

from registry.entrypoints.api.main import app

client = TestClient(app)


class TestRegistryEndpoint(unittest.TestCase):

    def test_root(self):
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Measurement Based Care Microservice"}
