## Setup DynamoDB on your local environment

> **Warning**
For local development you will need a free AWS account with cognito pools created. Please reference AWS docs.


### Setup NoSQL Workbench
1. Download and install NoSQL Workbench over here: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html
2. Once you installed NoSQL Workbench, run DynamoDB locally

### Set your environment variables
```commandline
export AWS_REGION=## 
export AWS_SECRET_NAME=##  
export AWS_ACCESS_KEY_ID=##
export AWS_SECRET_ACCESS_KEY=##
export DYNAMODB_TABLE=##
export AWS_COGNITO_USERPOOL_ID=##
export AWS_COGNITO_APP_CLIENT_ID=##
```

### Run the Fast API server

```commandline
python3 -m venv venv 
source venv/bin/activate
pip install -r requirements.txt
uvicorn akello.main:app --reload
```

### Call akello services

Create a new registry
```python
from akello import registry
moderate_depression = registry.create_registry('Moderate Depression')
```

Refer a patient
```python
from akello import registry
from akello.dynamodb.models.registry import PatientRegistry

# build a patient object using the PatientRegistry model
patient_registry = PatientRegistry(
    id='registry id',
    # .. other attributes
)

registry.refer_patient(patient_registry)

```


Add a patient encounter
```python
from akello import registry
from akello.dynamodb.models.registry import TreatmentLog

treatment_log = TreatmentLog(
    patient_mrn='<patients mrn>',
    phq9_score=16,
    gad7_score=12,
    minutes=4,
    # .. other required attributes
)
registry.add_treatment_log('<registry_id>', '<patient_id>', treatment_log)
```



## Publish a package
python3 -m build
twine upload dist/*


## Run tests
python3 -m unittest