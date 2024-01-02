
To generate the python models from the FHIR schema:
```shell
datamodel-codegen --input ../server/data/fhir.schema.json --input-file-type jsonschema --output model.py --output-model-type pydantic_v2.BaseModel


# Pydnatic is way too slow, using datacalasses

datamodel-codegen --input ../server/data/fhir.schema.json --input-file-type jsonschema --output model.py --output-model-type dataclasses.dataclass --special-field-name-prefix ''

datamodel-codegen --input ../server/data/fhir.schema.json --input-file-type jsonschema --output model.py --output-model-type dataclasses.dataclass --special-field-name-prefix '' --base-class fhir.hl7.XFHIR

```
