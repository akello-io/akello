
import dataclasses, json

class EnhancedJSONEncoder(json.JSONEncoder):
        def default(self, o):
            if dataclasses.is_dataclass(o):
                return dataclasses.asdict(o, dict_factory=lambda x: {k: v for (k, v) in x if v is not None})  # remove empty values
            return super().default(o)


class XFHIR:
    
    def save(self):
        print('save data model to the db')
        json_output = json.dumps(self, cls=EnhancedJSONEncoder)