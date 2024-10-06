import os
import json
from unittest import TestCase, mock
from akello.services.tests import mock_env_configs
from akello_apps.typeform.plugin import convert_typeform_to_phq9


@mock.patch.dict(os.environ, mock_env_configs)
class TestTypeform(TestCase):

    def test_convert_typeform_to_phq9(self):
        f = open('./akello_apps/typeform/tests/sample-phq9.json')
        data = json.load(f)
        result = convert_typeform_to_phq9(data)
        # Closing file
        f.close()
