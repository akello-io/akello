#!/usr/bin/env python3

import os
import json

def load_fhir_data():

    yourpath = './fhir'

    for root, dirs, files in os.walk(yourpath, topdown=False):
        for name in files:
            if name.endswith('.json'):
                with open(os.path.join(root, name)) as f:
                    data = json.load(f)
                    for resource in data["entry"]:
                        resource = resource["resource"]
                        if resource["resourceType"] == "Patient":
                            print(resource["resourceType"])
                            print(resource["id"])
                            print(resource["name"][0]["family"])
                            print(resource["name"][0]["given"][0])
                            print(resource["gender"])
                            print(resource["birthDate"])

                        if resource["resourceType"] == "Observation":
                            print(resource["resourceType"])
                            print(resource["id"])
                            print(resource["code"]["coding"][0]["code"])
                            #print(resource["valueQuantity"]["value"])
                            #print(resource["valueQuantity"]["unit"])
                            print(resource["effectiveDateTime"])

                        if resource["resourceType"] == "Condition":
                            print(resource["resourceType"])
                            print(resource["id"])
                            print(resource["code"]["coding"][0]["code"])
                            print(resource["code"]["coding"][0]["display"])
                            print(resource["onsetDateTime"])
                            #print(resource["assertedDate"])

                        if resource["resourceType"] == "MedicationRequest":
                            if 'medicationCodeableConcept' in resource:
                                print(resource["resourceType"])
                                print(resource["id"])
                                print(resource["medicationCodeableConcept"]["coding"][0]["code"])
                                print(resource["medicationCodeableConcept"]["coding"][0]["display"])
                                print(resource["authoredOn"])
                                print(resource["status"])
                                print(resource["intent"])

                        if resource["resourceType"] == "Procedure":
                            print(resource["resourceType"])
                            print(resource["id"])
                            print(resource["code"]["coding"][0]["code"])
                            print(resource["code"]["coding"][0]["display"])
                            #print(resource["performedDateTime"])
                            print(resource["status"])

                        if resource["resourceType"] == "FamilyMemberHistory":
                            print(resource["resourceType"])
                            print(resource["id"])
                            print(resource["relationship"]["coding"][0]["code"])
                            print(resource["relationship"]["coding"][0]["display"])
                            print(resource["condition"][0]["code"]["coding"][0]["code"])
                            print(resource["condition"][0]["code"]["coding"][0]["display"])
                            print(resource["condition"][0]["onsetDateTime"])
                            print(resource["condition"][0]["assertedDate"])

                        if resource["resourceType"] == "RelatedPerson":
                            print(resource["resourceType"])
                            print(resource["id"])
                            print(resource["relationship"][0]["coding"][0]["code"])
                            print(resource["relationship"][0]["coding"][0]["display"])
                            print(resource["name"]["family"])
                            print(resource["name"]["given"][0])

                        if resource["resourceType"] == "AllergyIntolerance":
                            print(resource["resourceType"])
                            print(resource["id"])
                            print(resource["code"]["coding"][0]["code"])
                            print(resource["code"]["coding"][0]["display"])
                            print(resource["onsetDateTime"])
                            print(resource["assertedDate"])
                            print(resource["status"])





if __name__ == '__main__':
    load_fhir_data()