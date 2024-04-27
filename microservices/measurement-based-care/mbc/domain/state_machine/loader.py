from .models.registry import Registry


def load_from_yaml_string(yaml_string):
    return Registry(yaml_string)
