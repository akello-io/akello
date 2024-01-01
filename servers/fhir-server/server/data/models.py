from enum import IntEnum
from uuid import uuid4
from pydantic import BaseModel, UUID4, Field, computed_field
from typing import List, Optional, Literal


class FHIRResource(BaseModel):
    fhir_resource: dict
    policies: List[Policy]