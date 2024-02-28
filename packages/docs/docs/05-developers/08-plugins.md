---
sidebar_position: 7
---

# Plugins

1. Plugin overview
2. Types of plugins
3. Implementing a new plugin

# Mixin

```python
from akello.decorators.mixin import mixin
@mixin(mixins=[
    APIMixin(order='pre', plugin=metriport, method='start_fhir_consolidated_data_query', args=['treatment_log.patient_mrn', 'registry_id']),
])
```


# Metriport

* Fetch FHIR data and calculate a risk score

### Step 1: Add the webhook into your app routes

```python
from akello.plugins.metriport.webhooks.metriport_webhook import router as metriport_webhook
app.include_router(metriport_webhook, prefix="/v1/integrations/metriport", tags=["Integrations"])
```

### Step 2: 

```python
@mixin(mixins=[
    APIMixin(order='pre', plugin=metriport, method='start_fhir_consolidated_data_query', args=['treatment_log.patient_mrn', 'registry_id']),
])
async def record_session(request: Request, registry_id: str, treatment_log: TreatmentLog, auth: CognitoTokenCustom = Depends(auth_token_check)): 
    UserService.check_registry_access(auth.cognito_id, registry_id)
    RegistryService.add_treatment_log(registry_id, treatment_log.patient_mrn, treatment_log)    
    return treatment_log

```
