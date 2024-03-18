# akello.db package

## Subpackages

* [akello.db.connector package](akello.db.connector.md)
  * [Submodules](akello.db.connector.md#submodules)
  * [akello.db.connector.dynamodb module](akello.db.connector.md#module-akello.db.connector.dynamodb)
    * [`RegistryDBBaseModel`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel)
      * [`RegistryDBBaseModel.append_to_attribute()`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel.append_to_attribute)
      * [`RegistryDBBaseModel.model_config`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel.model_config)
      * [`RegistryDBBaseModel.model_fields`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel.model_fields)
      * [`RegistryDBBaseModel.partition_key`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel.partition_key)
      * [`RegistryDBBaseModel.set_attribute()`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel.set_attribute)
    * [`setup_registry_db()`](akello.db.connector.md#akello.db.connector.dynamodb.setup_registry_db)
  * [akello.db.connector.s3 module](akello.db.connector.md#module-akello.db.connector.s3)
    * [`S3StorageLocal`](akello.db.connector.md#akello.db.connector.s3.S3StorageLocal)
      * [`S3StorageLocal.get_item()`](akello.db.connector.md#akello.db.connector.s3.S3StorageLocal.get_item)
      * [`S3StorageLocal.is_local`](akello.db.connector.md#akello.db.connector.s3.S3StorageLocal.is_local)
      * [`S3StorageLocal.set_item()`](akello.db.connector.md#akello.db.connector.s3.S3StorageLocal.set_item)
    * [`Storage`](akello.db.connector.md#akello.db.connector.s3.Storage)
      * [`Storage.get_item()`](akello.db.connector.md#akello.db.connector.s3.Storage.get_item)
      * [`Storage.is_local`](akello.db.connector.md#akello.db.connector.s3.Storage.is_local)
      * [`Storage.set_item()`](akello.db.connector.md#akello.db.connector.s3.Storage.set_item)
  * [Module contents](akello.db.connector.md#module-akello.db.connector)

## Submodules

## akello.db.models module

### *class* akello.db.models.PatientRegistry(\*, id: str | None = None, patient_flag: [FlagTypes](#akello.db.types.FlagTypes) | None = None, patient_mrn: str, date_created: float = 1710765972.591372, date_graduated: float | None = None, date_modified: float = 1710765972.591376, payer: str | None = None, referring_provider_npi: str | None = None, first_name: str, last_name: str, phone_number: str, email: str, date_of_birth: str, treatment_logs: List[[TreatmentLog](#akello.db.types.TreatmentLog)] = [], event_logs: List[[EventLog](#akello.db.types.EventLog)] = [], audit_logs: List[[AuditLog](#akello.db.types.AuditLog)] = [], flags: List[dict] = [], status: [PatientStatysTypes](#akello.db.types.PatientStatysTypes) = PatientStatysTypes.enrolled, initial_assessment: int | None = None, last_follow_up: int | None = None, last_psychiatric_consult: int | None = None, relapse_prevention_plan: int | None = None, total_sessions: int | None = 0, weeks_since_initial_assessment: int | None = 0, minutes_this_month: int | None = 0, schema_version: str | None = None)

Bases: [`RegistryDBBaseModel`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel)

Keeps a direct 1-1 mapping of a patient to a registry.
Currently we don’t support the same patient being in multiple registries.
Stores the complete patient record including all treatment logs

#### audit_logs *: List[[AuditLog](#akello.db.types.AuditLog)]*

#### date_created *: float*

#### date_graduated *: float | None*

#### date_modified *: float*

#### date_of_birth *: str*

#### email *: str*

#### event_logs *: List[[EventLog](#akello.db.types.EventLog)]*

#### first_name *: str*

#### flags *: List[dict]*

#### id *: str | None*

#### initial_assessment *: int | None*

#### last_follow_up *: int | None*

#### last_name *: str*

#### last_psychiatric_consult *: int | None*

#### minutes_this_month *: int | None*

#### model_config *: ClassVar[ConfigDict]* *= {'json_schema_extra': {'examples': [{'name': 'Foo'}]}}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'audit_logs': FieldInfo(annotation=List[AuditLog], required=False, default=[]), 'date_created': FieldInfo(annotation=float, required=False, default=1710765972.591372), 'date_graduated': FieldInfo(annotation=Union[float, NoneType], required=False), 'date_modified': FieldInfo(annotation=float, required=False, default=1710765972.591376), 'date_of_birth': FieldInfo(annotation=str, required=True), 'email': FieldInfo(annotation=str, required=True), 'event_logs': FieldInfo(annotation=List[EventLog], required=False, default=[]), 'first_name': FieldInfo(annotation=str, required=True), 'flags': FieldInfo(annotation=List[dict], required=False, default=[]), 'id': FieldInfo(annotation=Union[str, NoneType], required=False), 'initial_assessment': FieldInfo(annotation=Union[int, NoneType], required=False), 'last_follow_up': FieldInfo(annotation=Union[int, NoneType], required=False), 'last_name': FieldInfo(annotation=str, required=True), 'last_psychiatric_consult': FieldInfo(annotation=Union[int, NoneType], required=False), 'minutes_this_month': FieldInfo(annotation=Union[int, NoneType], required=False, default=0), 'patient_flag': FieldInfo(annotation=Union[FlagTypes, NoneType], required=False), 'patient_mrn': FieldInfo(annotation=str, required=True), 'payer': FieldInfo(annotation=Union[str, NoneType], required=False), 'phone_number': FieldInfo(annotation=str, required=True), 'referring_provider_npi': FieldInfo(annotation=Union[str, NoneType], required=False), 'relapse_prevention_plan': FieldInfo(annotation=Union[int, NoneType], required=False), 'schema_version': FieldInfo(annotation=Union[str, NoneType], required=False), 'status': FieldInfo(annotation=PatientStatysTypes, required=False, default=<PatientStatysTypes.enrolled: 'Enrolled'>), 'total_sessions': FieldInfo(annotation=Union[int, NoneType], required=False, default=0), 'treatment_logs': FieldInfo(annotation=List[TreatmentLog], required=False, default=[]), 'weeks_since_initial_assessment': FieldInfo(annotation=Union[int, NoneType], required=False, default=0)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### *property* object_type

#### patient_flag *: [FlagTypes](#akello.db.types.FlagTypes) | None*

#### patient_mrn *: str*

#### payer *: str | None*

#### phone_number *: str*

#### referring_provider_npi *: str | None*

#### relapse_prevention_plan *: int | None*

#### schema_version *: str | None*

#### *property* sort_key *: str*

#### status *: [PatientStatysTypes](#akello.db.types.PatientStatysTypes)*

#### toJson()

#### total_sessions *: int | None*

#### treatment_logs *: List[[TreatmentLog](#akello.db.types.TreatmentLog)]*

#### weeks_since_initial_assessment *: int | None*

### *class* akello.db.models.RegistryModel(\*, id: str, name: str, description: str, modified_date: float, created_date: float, members: int = 0, active_patients: int = 0, questionnaires: List[[Measurement](#akello.db.types.Measurement)] = None, akello_apps: List[[AkelloApp](#akello.db.types.AkelloApp)] = [], logo_url: str | None = None)

Bases: [`RegistryDBBaseModel`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel)

Represents a registry of patients. Stores all the metadata about the registry.

#### active_patients *: int*

#### akello_apps *: List[[AkelloApp](#akello.db.types.AkelloApp)]*

#### created_date *: float*

#### description *: str*

#### id *: str*

#### logo_url *: str | None*

#### members *: int*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'active_patients': FieldInfo(annotation=int, required=False, default=0), 'akello_apps': FieldInfo(annotation=List[AkelloApp], required=False, default=[]), 'created_date': FieldInfo(annotation=float, required=True), 'description': FieldInfo(annotation=str, required=True), 'id': FieldInfo(annotation=str, required=True), 'logo_url': FieldInfo(annotation=Union[str, NoneType], required=False), 'members': FieldInfo(annotation=int, required=False, default=0), 'modified_date': FieldInfo(annotation=float, required=True), 'name': FieldInfo(annotation=str, required=True), 'questionnaires': FieldInfo(annotation=List[Measurement], required=False)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### modified_date *: float*

#### name *: str*

#### *property* object_type *: str*

#### questionnaires *: List[[Measurement](#akello.db.types.Measurement)]*

#### *property* sort_key *: str*

### *class* akello.db.models.RegistryUser(\*, registry_id: str, user_id: str, date_created: int = 1710765972.589448, first_name: str, last_name: str, email: str, role: [UserRole](#akello.db.types.UserRole), is_admin: bool = False)

Bases: [`RegistryDBBaseModel`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel)

Stores the user information for a given registry
#TODO: This would duplicate user information, consider refactoring

#### date_created *: int*

#### email *: str*

#### first_name *: str*

#### is_admin *: bool*

#### last_name *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'date_created': FieldInfo(annotation=int, required=False, default=1710765972.589448), 'email': FieldInfo(annotation=str, required=True), 'first_name': FieldInfo(annotation=str, required=True), 'is_admin': FieldInfo(annotation=bool, required=False, default=False), 'last_name': FieldInfo(annotation=str, required=True), 'registry_id': FieldInfo(annotation=str, required=True), 'role': FieldInfo(annotation=UserRole, required=True), 'user_id': FieldInfo(annotation=str, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### *property* partition_key *: str*

#### registry_id *: str*

#### role *: [UserRole](#akello.db.types.UserRole)*

#### *property* sort_key *: str*

#### user_id *: str*

### *class* akello.db.models.UserEmail(\*, email: str, user_id: str, date_created: int = 1710765972.589987)

Bases: [`RegistryDBBaseModel`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel)

Used to map an email to the registry for fast lookups of unique emails
TODO: consider doing this with patients as well?

#### date_created *: int*

#### email *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'date_created': FieldInfo(annotation=int, required=False, default=1710765972.589987), 'email': FieldInfo(annotation=str, required=True), 'user_id': FieldInfo(annotation=str, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### *property* partition_key *: str*

#### *property* sort_key *: str*

#### user_id *: str*

### *class* akello.db.models.UserModel(\*, cognito_user_id: str, email: str | None = None, first_name: str | None = None, last_name: str | None = None, phone_number: str | None = None, profile_picture: str | None = None, registries: List[str] = [])

Bases: [`RegistryDBBaseModel`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel)

Represents a user in the system. This is the primary model for the user.

#### cognito_user_id *: str*

#### email *: str | None*

#### first_name *: str | None*

#### last_name *: str | None*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'cognito_user_id': FieldInfo(annotation=str, required=True), 'email': FieldInfo(annotation=Union[str, NoneType], required=False), 'first_name': FieldInfo(annotation=Union[str, NoneType], required=False), 'last_name': FieldInfo(annotation=Union[str, NoneType], required=False), 'phone_number': FieldInfo(annotation=Union[str, NoneType], required=False), 'profile_picture': FieldInfo(annotation=Union[str, NoneType], required=False), 'registries': FieldInfo(annotation=List[str], required=False, default=[])}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### *property* partition_key *: str*

#### phone_number *: str | None*

#### profile_picture *: str | None*

#### registries *: List[str]*

#### *property* sort_key *: str*

### *class* akello.db.models.UserRegistry(\*, user_id: str, registry_id: str, date_created: int = 1710765972.58919)

Bases: [`RegistryDBBaseModel`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel)

Stores the user to registry mapping

#### date_created *: int*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'date_created': FieldInfo(annotation=int, required=False, default=1710765972.58919), 'registry_id': FieldInfo(annotation=str, required=True), 'user_id': FieldInfo(annotation=str, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### *property* partition_key *: str*

#### registry_id *: str*

#### *property* sort_key *: str*

#### user_id *: str*

### *class* akello.db.models.UserSession(\*, user_id: str, date_created: int = 1710765972.588832, user_agent: dict, ip: str)

Bases: [`RegistryDBBaseModel`](akello.db.connector.md#akello.db.connector.dynamodb.RegistryDBBaseModel)

Stores user session information to audit login and usage

#### date_created *: int*

#### ip *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'date_created': FieldInfo(annotation=int, required=False, default=1710765972.588832), 'ip': FieldInfo(annotation=str, required=True), 'user_agent': FieldInfo(annotation=dict, required=True), 'user_id': FieldInfo(annotation=str, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### *property* partition_key *: str*

#### *property* sort_key *: int*

#### user_agent *: dict*

#### user_id *: str*

## akello.db.types module

### *class* akello.db.types.AkelloApp(\*, id: str, group: str, status: str, name: str, description: str, logo: str, react_component: str, configs: dict)

Bases: `BaseModel`

#### configs *: dict*

#### description *: str*

#### group *: str*

#### id *: str*

#### logo *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'configs': FieldInfo(annotation=dict, required=True), 'description': FieldInfo(annotation=str, required=True), 'group': FieldInfo(annotation=str, required=True), 'id': FieldInfo(annotation=str, required=True), 'logo': FieldInfo(annotation=str, required=True), 'name': FieldInfo(annotation=str, required=True), 'react_component': FieldInfo(annotation=str, required=True), 'status': FieldInfo(annotation=str, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### name *: str*

#### react_component *: str*

#### status *: str*

### *class* akello.db.types.AuditLog(\*, object_name: str, action: str, user_id: str, created_date: float)

Bases: `BaseModel`

#### action *: str*

#### created_date *: float*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'action': FieldInfo(annotation=str, required=True), 'created_date': FieldInfo(annotation=float, required=True), 'object_name': FieldInfo(annotation=str, required=True), 'user_id': FieldInfo(annotation=str, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### object_name *: str*

#### user_id *: str*

### *class* akello.db.types.ContactTypes(value, names=None, \*values, module=None, qualname=None, type=None, start=1, boundary=None)

Bases: `str`, `Enum`

#### follow_up *= 'Follow Up'*

#### initial_assessment *= 'Initial Assessment'*

#### psychiatric_consultation *= 'Psychiatric Consultation'*

#### relapse_prevention *= 'Relapse Prevention Plan'*

### *class* akello.db.types.EventLog(\*, id: str, system: str | None = None, data: dict | None = None, created_date: float, modified_date: float)

Bases: `BaseModel`

#### created_date *: float*

#### data *: dict | None*

#### id *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'created_date': FieldInfo(annotation=float, required=True), 'data': FieldInfo(annotation=Union[dict, NoneType], required=False), 'id': FieldInfo(annotation=str, required=True), 'modified_date': FieldInfo(annotation=float, required=True), 'system': FieldInfo(annotation=Union[str, NoneType], required=False)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### modified_date *: float*

#### system *: str | None*

### *class* akello.db.types.FHIRWeight(\*, name: str, jsonPath: str, codes: List[str], weight: int)

Bases: `BaseModel`

#### codes *: List[str]*

#### jsonPath *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'codes': FieldInfo(annotation=List[str], required=True), 'jsonPath': FieldInfo(annotation=str, required=True), 'name': FieldInfo(annotation=str, required=True), 'weight': FieldInfo(annotation=int, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### name *: str*

#### weight *: int*

### *class* akello.db.types.Flag(\*, flag_type: [FlagTypes](#akello.db.types.FlagTypes), created_by_provider_id: str, resolved_by_provider_id: str | None, resolved_date: float | None, created_date: float)

Bases: `BaseModel`

#### created_by_provider_id *: str*

#### created_date *: float*

#### flag_type *: [FlagTypes](#akello.db.types.FlagTypes)*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'created_by_provider_id': FieldInfo(annotation=str, required=True), 'created_date': FieldInfo(annotation=float, required=True), 'flag_type': FieldInfo(annotation=FlagTypes, required=True), 'resolved_by_provider_id': FieldInfo(annotation=Union[str, NoneType], required=True), 'resolved_date': FieldInfo(annotation=Union[float, NoneType], required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### resolved_by_provider_id *: str | None*

#### resolved_date *: float | None*

### *class* akello.db.types.FlagTypes(value, names=None, \*values, module=None, qualname=None, type=None, start=1, boundary=None)

Bases: `str`, `Enum`

#### needs_discussion *= 'Needs Discussion'*

#### review_with_psychiatrist *= 'Review with Psychiatrist'*

#### safety_risk *= 'Safety Risk'*

### *class* akello.db.types.Measurement(\*, name: str, uid: str, type: str, active: bool | None = False, measurements: List[[Question](#akello.db.types.Question)] | List[[FHIRWeight](#akello.db.types.FHIRWeight)])

Bases: `BaseModel`

#### active *: bool | None*

#### measurements *: List[[Question](#akello.db.types.Question)] | List[[FHIRWeight](#akello.db.types.FHIRWeight)]*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'active': FieldInfo(annotation=Union[bool, NoneType], required=False, default=False), 'measurements': FieldInfo(annotation=Union[List[Question], List[FHIRWeight]], required=True), 'name': FieldInfo(annotation=str, required=True), 'type': FieldInfo(annotation=str, required=True), 'uid': FieldInfo(annotation=str, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### name *: str*

#### type *: str*

#### uid *: str*

### *class* akello.db.types.PatientStatysTypes(value, names=None, \*values, module=None, qualname=None, type=None, start=1, boundary=None)

Bases: `str`, `Enum`

#### deactivated *= 'Deactivated'*

#### enrolled *= 'Enrolled'*

#### relapse_prevention_plan *= 'Relapse Prevention Plan'*

#### treatment *= 'Treatment'*

### *class* akello.db.types.Question(\*, id: str, question: str, responses: List[[QuestionResponse](#akello.db.types.QuestionResponse)], score: int = 0)

Bases: `BaseModel`

#### id *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'id': FieldInfo(annotation=str, required=True), 'question': FieldInfo(annotation=str, required=True), 'responses': FieldInfo(annotation=List[QuestionResponse], required=True), 'score': FieldInfo(annotation=int, required=False, default=0)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### question *: str*

#### responses *: List[[QuestionResponse](#akello.db.types.QuestionResponse)]*

#### score *: int*

### *class* akello.db.types.QuestionResponse(\*, id: str, response: str, score: int)

Bases: `BaseModel`

#### id *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'id': FieldInfo(annotation=str, required=True), 'response': FieldInfo(annotation=str, required=True), 'score': FieldInfo(annotation=int, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### response *: str*

#### score *: int*

### *class* akello.db.types.TreatmentLog(\*, id: str = None, patient_mrn: str | None = None, provider: str | None = None, no_show: bool | None = False, flag: [FlagTypes](#akello.db.types.FlagTypes) | None = None, weeks_in_treatment: int, contact_type: [ContactTypes](#akello.db.types.ContactTypes), visit_type: [VisitTypes](#akello.db.types.VisitTypes), scores: List[[TreatmentLogScore](#akello.db.types.TreatmentLogScore)] = [], minutes: float | None = None, sms_reminder_sent_date: float | None = None, sms_conformation_received_date: float | None = None, total_sms_reminders_sent: int | None = 0, email_reminder_sent_date: float | None = None, email_conformation_received_date: float | None = None, total_email_reminders_sent: int | None = 0, date: float)

Bases: `BaseModel`

#### contact_type *: [ContactTypes](#akello.db.types.ContactTypes)*

#### date *: float*

#### email_conformation_received_date *: float | None*

#### email_reminder_sent_date *: float | None*

#### flag *: [FlagTypes](#akello.db.types.FlagTypes) | None*

#### id *: str*

#### minutes *: float | None*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'contact_type': FieldInfo(annotation=ContactTypes, required=True), 'date': FieldInfo(annotation=float, required=True), 'email_conformation_received_date': FieldInfo(annotation=Union[float, NoneType], required=False), 'email_reminder_sent_date': FieldInfo(annotation=Union[float, NoneType], required=False), 'flag': FieldInfo(annotation=Union[FlagTypes, NoneType], required=False), 'id': FieldInfo(annotation=str, required=False), 'minutes': FieldInfo(annotation=Union[float, NoneType], required=False), 'no_show': FieldInfo(annotation=Union[bool, NoneType], required=False, default=False), 'patient_mrn': FieldInfo(annotation=Union[str, NoneType], required=False), 'provider': FieldInfo(annotation=Union[str, NoneType], required=False), 'scores': FieldInfo(annotation=List[TreatmentLogScore], required=False, default=[]), 'sms_conformation_received_date': FieldInfo(annotation=Union[float, NoneType], required=False), 'sms_reminder_sent_date': FieldInfo(annotation=Union[float, NoneType], required=False), 'total_email_reminders_sent': FieldInfo(annotation=Union[int, NoneType], required=False, default=0), 'total_sms_reminders_sent': FieldInfo(annotation=Union[int, NoneType], required=False, default=0), 'visit_type': FieldInfo(annotation=VisitTypes, required=True), 'weeks_in_treatment': FieldInfo(annotation=int, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### no_show *: bool | None*

#### patient_mrn *: str | None*

#### provider *: str | None*

#### scores *: List[[TreatmentLogScore](#akello.db.types.TreatmentLogScore)]*

#### sms_conformation_received_date *: float | None*

#### sms_reminder_sent_date *: float | None*

#### total_email_reminders_sent *: int | None*

#### total_sms_reminders_sent *: int | None*

#### visit_type *: [VisitTypes](#akello.db.types.VisitTypes)*

#### weeks_in_treatment *: int*

### *class* akello.db.types.TreatmentLogScore(\*, score_name: str, score_value: int)

Bases: `BaseModel`

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'score_name': FieldInfo(annotation=str, required=True), 'score_value': FieldInfo(annotation=int, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### score_name *: str*

#### score_value *: int*

### *class* akello.db.types.UserInvite(\*, email: str, first_name: str, last_name: str, invited_by: str, registry_id: str, date_created: int, role: [UserRole](#akello.db.types.UserRole))

Bases: `BaseModel`

#### *static* create(cognito_user_id, email, role: [UserRole](#akello.db.types.UserRole), registry_id)

#### date_created *: int*

#### email *: str*

#### first_name *: str*

#### *static* get_invites(email)

#### invited_by *: str*

#### last_name *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'date_created': FieldInfo(annotation=int, required=True), 'email': FieldInfo(annotation=str, required=True), 'first_name': FieldInfo(annotation=str, required=True), 'invited_by': FieldInfo(annotation=str, required=True), 'last_name': FieldInfo(annotation=str, required=True), 'registry_id': FieldInfo(annotation=str, required=True), 'role': FieldInfo(annotation=UserRole, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### *property* partition_key *: str*

#### registry_id *: str*

#### role *: [UserRole](#akello.db.types.UserRole)*

#### *property* sort_key *: str*

### *class* akello.db.types.UserRole(value, names=None, \*values, module=None, qualname=None, type=None, start=1, boundary=None)

Bases: `str`, `Enum`

#### care_manager *= 'Care Manager'*

#### clinical_ops *= 'Clinical Ops'*

#### consulting_psychiatrist *= 'Consulting Psychiatrist'*

#### finance *= 'Finance'*

#### primary_care_physician *= 'Primary Care Physician'*

### *class* akello.db.types.VisitTypes(value, names=None, \*values, module=None, qualname=None, type=None, start=1, boundary=None)

Bases: `str`, `Enum`

#### clinic *= 'Clinic'*

#### in_person *= 'In-person w/ Patient'*

#### phone *= 'Phone'*

## Module contents
