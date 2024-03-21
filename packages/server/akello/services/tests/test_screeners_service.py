import os
from unittest import TestCase, mock
from akello.services.tests import mock_env_configs
from akello.services.screeners import ScreenerService


@mock.patch.dict(os.environ, mock_env_configs)
class TestScreenerService(TestCase):

    def test_screener_count(self):
        screeners = ScreenerService.get_screeners()
        assert len(screeners) == 4
