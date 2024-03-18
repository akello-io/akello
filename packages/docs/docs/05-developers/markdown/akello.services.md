# akello.services package

## Subpackages

* [akello.services.tests package](akello.services.tests.md)
  * [Submodules](akello.services.tests.md#submodules)
  * [akello.services.tests.test_decorators module](akello.services.tests.md#module-akello.services.tests.test_decorators)
  * [akello.services.tests.test_registry_service module](akello.services.tests.md#module-akello.services.tests.test_registry_service)
    * [`TestRegistryService`](akello.services.tests.md#akello.services.tests.test_registry_service.TestRegistryService)
      * [`TestRegistryService.test_create_registry()`](akello.services.tests.md#akello.services.tests.test_registry_service.TestRegistryService.test_create_registry)
      * [`TestRegistryService.test_get_registry()`](akello.services.tests.md#akello.services.tests.test_registry_service.TestRegistryService.test_get_registry)
  * [akello.services.tests.test_reports_service module](akello.services.tests.md#module-akello.services.tests.test_reports_service)
  * [akello.services.tests.test_screeners_service module](akello.services.tests.md#module-akello.services.tests.test_screeners_service)
    * [`TestScreenerService`](akello.services.tests.md#akello.services.tests.test_screeners_service.TestScreenerService)
      * [`TestScreenerService.test_screener_count()`](akello.services.tests.md#akello.services.tests.test_screeners_service.TestScreenerService.test_screener_count)
  * [akello.services.tests.test_user_service module](akello.services.tests.md#module-akello.services.tests.test_user_service)
    * [`TestUserService`](akello.services.tests.md#akello.services.tests.test_user_service.TestUserService)
      * [`TestUserService.test_registry_access_does_not_exist()`](akello.services.tests.md#akello.services.tests.test_user_service.TestUserService.test_registry_access_does_not_exist)
      * [`TestUserService.test_registry_access_exists()`](akello.services.tests.md#akello.services.tests.test_user_service.TestUserService.test_registry_access_exists)
      * [`TestUserService.test_service_get_user()`](akello.services.tests.md#akello.services.tests.test_user_service.TestUserService.test_service_get_user)
  * [Module contents](akello.services.tests.md#module-akello.services.tests)

## Submodules

## akello.services.akello_apps module

### *class* akello.services.akello_apps.AkelloAppsService

Bases: [`BaseService`](#akello.services.BaseService)

#### *static* get_app_configs(registry_id: str)

#### *static* save_akello_app(registry_id: str, akello_app: [AkelloApp](akello.db.md#akello.db.types.AkelloApp))

## akello.services.fhir_resource module

## akello.services.registry module

### *class* akello.services.registry.RegistryService

Bases: [`BaseService`](#akello.services.BaseService)

#### *static* add_treatment_log(registry_id, sort_key, treatment_log: [TreatmentLog](akello.db.md#akello.db.types.TreatmentLog))

Updates the treatment logs for a patient in the registry by appending a new treatment log entry.
It also updates specific attributes based on the contact type of the treatment log.

* **Parameters:**
  * **registry_id** – The unique identifier for the registry.
  * **sort_key** – The sort key used for the database entry.
  * **treatment_log** – An instance of TreatmentLog representing the new treatment log to be added.

#### *static* create_registry(name, description, questionnaires, integrations, logo_url=None)

#### *static* get_members(registry_id)

#### *static* get_patient(registry_id, patient_id)

#### *static* get_patients(registry_id, flag=None)

#### *static* get_registry(registry_id)

#### *static* refer_patient(patient_registry: [PatientRegistry](akello.db.md#akello.db.models.PatientRegistry))

#### *static* set_measurements(registry_id, measurements)

#### *static* update_patient(patient_registry: [PatientRegistry](akello.db.md#akello.db.models.PatientRegistry))

#### *static* update_registry_akello_apps(registry_id, akello_apps)

#### *static* update_stats(registry_id)

## akello.services.reports module

### *class* akello.services.reports.ReportsService

Bases: [`BaseService`](#akello.services.BaseService)

The ReportsService class is responsible for generating reports related to billing and registry dashboards
for a healthcare provider. It leverages static methods to access patient data and compute relevant statistics
for a specified period.

#### *static* get_billing_report(registry_id, from_date, to_date)

Generates a billing report for a given registry within a specific date range.
The report includes patient treatment logs, summarized by minutes spent per month.

Parameters:
- registry_id: An identifier for the registry whose billing report is to be generated.
- from_date: The starting timestamp (inclusive) for filtering treatment logs.
- to_date: The ending timestamp (inclusive) for filtering treatment logs.

Returns:
- A list of dictionaries, each representing a billing entry for a patient including first name, last name,
medical record number (MRN), date, payer, referring provider NPI, and total minutes of treatment.

#### *static* get_registry_dashboard(registry_id, from_date, to_date)

Generates a dashboard report for a given registry within a specific date range, including information
on payer distribution, patient statuses, and treatment performance metrics such as average, median,
and maximum treatment weeks.

Parameters:
- registry_id: An identifier for the registry whose dashboard report is to be generated.
- from_date: The starting timestamp (inclusive) for considering patient treatments.
- to_date: The ending timestamp (inclusive) for considering patient treatments.

Returns:
- A dictionary containing structured information about the treatment performance, screening scores,
payer distribution, and patient status distribution for the specified registry and date range.

## akello.services.screeners module

### *class* akello.services.screeners.ScreenerService

Bases: [`BaseService`](#akello.services.BaseService)

#### *static* get_screeners()

Get all screeners from the screener’s directory. The client will present to the user to select which screener they want active in a registry.
Returns: list of screeners

## akello.services.user module

### *class* akello.services.user.UserService

Bases: [`BaseService`](#akello.services.BaseService)

UserService provides functionalities to manage user information and sessions
within a database. It includes methods for retrieving user profiles, user sessions,
creating and updating user information, and checking user access to specific registries.

#### *static* check_registry_access(cognito_user_id, registry_id)

Checks if a user has access to a registry.
:param cognito_user_id: The Cognito user ID of the user.
:type cognito_user_id: str
:param registry_id: The registry ID to associate the user with.
:type registry_id: str

* **Returns:**
  Raises an exception if the user is not authorized to access the registry.

#### *static* create_registry_user(registry_id, first_name, last_name, email, user_id, role: [UserRole](akello.db.md#akello.db.types.UserRole), is_admin: bool)

Creates a new registry user association in the database.

* **Parameters:**
  * **registry_id** (*str*) – The ID of the registry.
  * **first_name** (*str*) – The first name of the user.
  * **last_name** (*str*) – The last name of the user.
  * **email** (*str*) – The email of the user.
  * **user_id** (*str*) – The user ID.
  * **role** ([*UserRole*](akello.db.md#akello.db.types.UserRole)) – The role of the user in the registry.
  * **is_admin** (*bool*) – Indicates if the user is an admin.
* **Raises:**
  **ClientError** – If the registry user could not be created.

#### *static* create_user(cognito_user_id, email, first_name, last_name, profile_photo)

Creates a new user in the database.

* **Parameters:**
  * **cognito_user_id** (*str*) – The Cognito user ID for the new user.
  * **email** (*str*) – The email address of the new user.
  * **first_name** (*str*) – The first name of the new user.
  * **last_name** (*str*) – The last name of the new user.
  * **profile_photo** (*str*) – The URL of the profile photo for the new user.
* **Raises:**
  **ClientError** – If the user could not be created in the database.

#### *static* create_user_registry(user_id, registry_id)

Creates a new user-registry association in the database.

* **Parameters:**
  * **user_id** (*str*) – The user ID of the user.
  * **registry_id** (*str*) – The registry ID to associate the user with.
* **Raises:**
  **ClientError** – If the association could not be created.

#### *static* get_registries(cognito_user_id)

Creates registry user association in the database.

* **Parameters:**
  **cognito_user_id** (*str*) – The Cognito user ID of the user.
* **Raises:**
  **ClientError** – If the system fails to query the database.

#### *static* get_user(cognito_user_id)

Retrieves the user profile from the database using the given Cognito user ID.

* **Parameters:**
  **cognito_user_id** (*str*) – The Cognito user ID of the user to retrieve.
* **Returns:**
  A list of items representing the user’s profile.
* **Return type:**
  List[Dict]
* **Raises:**
  **ClientError** – If the query to the database fails.

#### *static* get_user_sessions(cognito_user_id)

Retrieves the sessions of a user sorted in reverse chronological order.

* **Parameters:**
  **cognito_user_id** (*str*) – The Cognito user ID of the user whose sessions are to be retrieved.
* **Returns:**
  A list of items representing the user’s sessions.
* **Return type:**
  List[Dict]
* **Raises:**
  **ClientError** – If the query to the database fails.

#### *static* save_user_session(cognito_user_id, user_agent, ip_address)

Saves a new user session to the database.

* **Parameters:**
  * **cognito_user_id** (*str*) – The Cognito user ID of the user.
  * **user_agent** (*str*) – The user agent string of the user’s device.
  * **ip_address** (*str*) – The IP address of the user’s device.
* **Raises:**
  **ClientError** – If saving the session to the database fails.

#### *static* set_user_active(cognito_user_id)

Updates the last login timestamp for a user, effectively setting them as active.

* **Parameters:**
  **cognito_user_id** (*str*) – The Cognito user ID of the user to update.

#### *static* update_profile_photo(cognito_user_id, photo_url)

Updates the profile photo URL of a user.

* **Parameters:**
  * **cognito_user_id** (*str*) – The Cognito user ID of the user.
  * **photo_url** (*str*) – The new URL of the user’s profile photo.

## Module contents

### *class* akello.services.BaseService

Bases: `object`
