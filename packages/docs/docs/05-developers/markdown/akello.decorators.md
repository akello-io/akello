# akello.decorators package

## Submodules

## akello.decorators.mixin module

### *class* akello.decorators.mixin.APIMixin(\*, order: str, plugin: object, method: str, args: List[str] = [])

Bases: `BaseModel`

#### args *: List[str]*

#### method *: str*

#### model_config *: ClassVar[ConfigDict]* *= {}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

#### model_fields *: ClassVar[dict[str, FieldInfo]]* *= {'args': FieldInfo(annotation=List[str], required=False, default=[]), 'method': FieldInfo(annotation=str, required=True), 'order': FieldInfo(annotation=str, required=True), 'plugin': FieldInfo(annotation=object, required=True)}*

Metadata about the fields defined on the model,
mapping of field names to [FieldInfo][pydantic.fields.FieldInfo].

This replaces Model._\_fields_\_ from Pydantic V1.

#### order *: str*

#### plugin *: object*

### akello.decorators.mixin.mixin(\*, mixins: List[[APIMixin](#akello.decorators.mixin.APIMixin)])

### akello.decorators.mixin.run_plugin(\_mixin, \*\*kwargs)

## Module contents
