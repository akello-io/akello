# akello.auth.aws_cognito package

## Submodules

## akello.auth.aws_cognito.auth_settings module

### *class* akello.auth.aws_cognito.auth_settings.CognitoTokenCustom(\*, origin_jti: str | None = None, sub: str, event_id: str | None = None, token_use: str, scope: str | None = None, auth_time: int, iss: Url, exp: int, iat: int, jti: str, client_id: str | None = None, username: str | None = None, email: str, family_name: str | None = None, given_name: str | None = None)

Bases: `BaseModel`

#### auth_time *: int*

#### client_id *: str | None*

#### cognito_id *: str*

#### email *: str*

#### event_id *: str | None*

#### exp *: int*

#### family_name *: str | None*

#### given_name *: str | None*

#### iat *: int*

#### iss *: Url*

#### jti *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'auth_time': FieldInfo(annotation=int, required=True), 'client_id': FieldInfo(annotation=Union[str, NoneType], required=False), 'cognito_id': FieldInfo(annotation=str, required=True, alias='sub', alias_priority=2), 'email': FieldInfo(annotation=str, required=True), 'event_id': FieldInfo(annotation=Union[str, NoneType], required=False), 'exp': FieldInfo(annotation=int, required=True), 'family_name': FieldInfo(annotation=Union[str, NoneType], required=False), 'given_name': FieldInfo(annotation=Union[str, NoneType], required=False), 'iat': FieldInfo(annotation=int, required=True), 'iss': FieldInfo(annotation=Url, required=True, metadata=[UrlConstraints(max_length=2083, allowed_schemes=['http', 'https'], host_required=None, default_host=None, default_port=None, default_path=None)]), 'jti': FieldInfo(annotation=str, required=True), 'origin_jti': FieldInfo(annotation=Union[str, NoneType], required=False), 'scope': FieldInfo(annotation=Union[str, NoneType], required=False), 'token_use': FieldInfo(annotation=str, required=True), 'username': FieldInfo(annotation=Union[str, NoneType], required=False)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### origin_jti *: str | None*

#### scope *: str | None*

#### token_use *: str*

#### username *: str | None*

### *class* akello.auth.aws_cognito.auth_settings.Settings(\_case_sensitive: bool | None = None, \_env_prefix: str | None = None, \_env_file: DotenvType | None = PosixPath('.'), \_env_file_encoding: str | None = None, \_env_nested_delimiter: str | None = None, \_secrets_dir: str | Path | None = None, \*, check_expiration: bool = True, jwt_header_prefix: str = 'Bearer', jwt_header_name: str = 'Authorization', userpools: dict[str, dict[str, Any]] = {'us': {'app_client_id': '8ssienbbl0vav5em1zcxpgt41', 'region': '', 'userpool_id': 'local_67grBvos'}})

Bases: `BaseSettings`

#### check_expiration *: bool*

#### jwt_header_name *: str*

#### jwt_header_prefix *: str*

#### model_config *: ClassVar[SettingsConfigDict]* *= {'arbitrary_types_allowed': True, 'case_sensitive': False, 'env_file': None, 'env_file_encoding': None, 'env_nested_delimiter': None, 'env_prefix': '', 'extra': 'forbid', 'protected_namespaces': ('model_', 'settings_'), 'secrets_dir': None, 'validate_default': True}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'check_expiration': FieldInfo(annotation=bool, required=False, default=True), 'jwt_header_name': FieldInfo(annotation=str, required=False, default='Authorization'), 'jwt_header_prefix': FieldInfo(annotation=str, required=False, default='Bearer'), 'userpools': FieldInfo(annotation=dict[str, dict[str, Any]], required=False, default={'us': {'region': '', 'userpool_id': 'local_67grBvos', 'app_client_id': '8ssienbbl0vav5em1zcxpgt41'}})}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### userpools *: dict[str, dict[str, Any]]*

## akello.auth.aws_cognito.aws_cognito module

### *class* akello.auth.aws_cognito.aws_cognito.Settings(\_case_sensitive: bool | None = None, \_env_prefix: str | None = None, \_env_file: DotenvType | None = PosixPath('.'), \_env_file_encoding: str | None = None, \_env_nested_delimiter: str | None = None, \_secrets_dir: str | Path | None = None, \*, check_expiration: bool = True, jwt_header_prefix: str = 'Bearer', jwt_header_name: str = 'Authorization', userpools: dict[str, dict[str, Any]] = {'us': {'app_client_id': '8ssienbbl0vav5em1zcxpgt41', 'endpoint': 'http://localhost:9229', 'region': '', 'userpool_id': 'local_67grBvos'}})

Bases: `BaseSettings`

#### check_expiration *: bool*

#### jwt_header_name *: str*

#### jwt_header_prefix *: str*

#### model_config *: ClassVar[SettingsConfigDict]* *= {'arbitrary_types_allowed': True, 'case_sensitive': False, 'env_file': None, 'env_file_encoding': None, 'env_nested_delimiter': None, 'env_prefix': '', 'extra': 'forbid', 'protected_namespaces': ('model_', 'settings_'), 'secrets_dir': None, 'validate_default': True}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'check_expiration': FieldInfo(annotation=bool, required=False, default=True), 'jwt_header_name': FieldInfo(annotation=str, required=False, default='Authorization'), 'jwt_header_prefix': FieldInfo(annotation=str, required=False, default='Bearer'), 'userpools': FieldInfo(annotation=dict[str, dict[str, Any]], required=False, default={'us': {'region': '', 'userpool_id': 'local_67grBvos', 'app_client_id': '8ssienbbl0vav5em1zcxpgt41', 'endpoint': 'http://localhost:9229'}})}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### userpools *: dict[str, dict[str, Any]]*

### *async* akello.auth.aws_cognito.aws_cognito.local_auth_required(request: Request)

## Module contents
