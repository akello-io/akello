import os
from unittest import TestCase, mock
from akello.services.tests import mock_env_configs


@mock.patch.dict(os.environ, mock_env_configs)
class TestScreenerService(TestCase):

    def test_screener_count(self):
        pass
