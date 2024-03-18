# akello.db.connector package

## Submodules

## akello.db.connector.dynamodb module

### *class* akello.db.connector.dynamodb.RegistryDBBaseModel

Bases: `BaseModel`

#### *static* append_to_attribute(partition_key, sort_key, attribute_name: str, attribute_value: any)

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### *property* partition_key *: str*

#### *static* set_attribute(partition_key, sort_key, attribute_name: str, attribute_value: any)

### akello.db.connector.dynamodb.setup_registry_db()

## akello.db.connector.s3 module

### *class* akello.db.connector.s3.S3StorageLocal

Bases: [`Storage`](#akello.db.connector.s3.Storage)

#### get_item(key)

#### is_local *= True*

#### *async* set_item(key, value)

### *class* akello.db.connector.s3.Storage

Bases: `object`

#### get_item(key)

#### is_local *= True*

#### set_item(key, value)

## Module contents
