export const TestQuestionnaire1 = {
  "resourceType": "Questionnaire",
  "meta": {
    "profile": [
      "http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire"
    ],
    "tag": [
      {
        "code": "lformsVersion: 34.3.0"
      }
    ]
  },
  "title": "PHQ-9 quick depression assessment panel [Reported.PHQ]",
  "status": "draft",
  "copyright": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute.",
  "code": [
    {
      "system": "http://loinc.org",
      "code": "44249-1",
      "display": "PHQ-9 quick depression assessment panel [Reported.PHQ]"
    }
  ],
  "item": [
    {
      "type": "choice",
      "code": [
        {
          "code": "44250-9",
          "display": "Little interest or pleasure in doing things",
          "system": "http://loinc.org"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": false,
      "linkId": "/44250-9",
      "text": "Little interest or pleasure in doing things",
      "answerOption": [
        {
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all",
            "system": "http://loinc.org"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ]
        },
        {
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days",
            "system": "http://loinc.org"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ]
        },
        {
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days",
            "system": "http://loinc.org"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ]
        },
        {
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day",
            "system": "http://loinc.org"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ]
        }
      ]
    },
  ]
}