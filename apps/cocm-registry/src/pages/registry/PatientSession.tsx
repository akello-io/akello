import StopWatch from "../../components/stopwatch/StopWatch";
import {useEffect, useState} from "react";
import {Button, Select, Checkbox} from "@mantine/core";
import { useAkello } from "@akello/react-hook";
import { useNavigate } from "react-router";
//import { QuestionnaireForm } from "@akello/react";
import QuestionnaireForm from "../../components/QuestionnaireForm";


/*
const phq9 = {
    "resourceType": "Questionnaire",
    "id": "PHQ9",
    "meta": {
      "profile": [
        "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|3.0.0"
      ]
    },  
    "contained": [
      {
        "resourceType": "ValueSet",
        "id": "VSPHQ9",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-valueset"
          ]
        },
        "url": "http://hl7.org/fhir/uv/sdc/ValueSet/VSPHQ9",
        "name": "VSPHQ9",
        "status": "draft",
        "description": "The answer list for questions addressing the frequency in which patient reports experiencing behaviors that are assessed in the PHQ-9 Questionnaire.",
        "immutable": true,
        "compose": {
          "include": [
            {
              "system": "http://hl7.org/fhir/uv/sdc/CodeSystem/CSPHQ9",
              "concept": [
                {
                  "extension": [
                    {
                      "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                      "valueDecimal": 0
                    }
                  ],
                  "code": "Not-at-all",
                  "display": "Not at all"
                },
                {
                  "extension": [
                    {
                      "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                      "valueDecimal": 1
                    }
                  ],
                  "code": "Several-days",
                  "display": "Several days"
                },
                {
                  "extension": [
                    {
                      "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                      "valueDecimal": 2
                    }
                  ],
                  "code": "More than half the days",
                  "display": "More than half the days"
                },
                {
                  "extension": [
                    {
                      "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                      "valueDecimal": 3
                    }
                  ],
                  "code": "Nearly every day",
                  "display": "Nearly every day"
                }
              ]
            }
          ]
        }
      }
    ],
    "extension": [
      {
        "url": "http://hl7.org/fhir/StructureDefinition/rendering-styleSensitive",
        "valueBoolean": true
      }
    ],
    "url": "http://hl7.org/fhir/uv/sdc/Questionnaire/questionnaire-sdc-profile-example-PHQ9",
    "version": "3.0.0",
    "name": "SDCPHQ9",
    "title": "Patient Health Questionnaire - 9 Item",
    "status": "draft",
    "experimental": true,
    "subjectType": [
      "Patient"
    ],
    "date": "2022-03-08T18:33:14+00:00",
    "publisher": "HL7 International - FHIR Infrastructure Work Group",
    "contact": [
      {
        "telecom": [
          {
            "system": "url",
            "value": "http://hl7.org/Special/committees/fiwg"
          }
        ]
      }
    ],
    "description": "This is a Questionnaire example of how the PHQ-9 Questionnaire could be rendered as a FHIR Questionnaire Resource according to the Structured Data Capture SDC Base Questionnaire Profile. This example also portrays how FHIRpaths can be used to perform total score calculations using answer values.",
    "jurisdiction": [
      {
        "coding": [
          {
            "system": "http://unstats.un.org/unsd/methods/m49/m49.htm",
            "code": "001"
          }
        ]
      }
    ],
    "purpose": "This Questionnaire example was generated to ensure a non-proprietary, publicly available questionnaire that is available to test the Structured Data Capture profiles",
    "copyright": "This content is an unaltered digital reproduction of the PHQ-9 which is copyrighted by Pfizer Inc., which states that no permission is required to reproduce, translate, display or distribute the PHQ-9.",
    "approvalDate": "2019-08-20",
    "effectivePeriod": {
      "start": "2018-08-20T04:00:00.000Z",
      "end": "2020-08-20T04:00:00.000Z"
    },
    "item": [
      {
        "linkId": "H1/T1",
        "text": "Over the last two weeks, how often have you been bothered by any of the following problems?",
        "type": "group",
        "item": [
          {
            "linkId": "H1/T1/Q1",
            "text": "Little interest or pleasure in doing things?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "linkId": "H1/T1/Q2",
            "text": "Feeling down, depressed, or hopeless?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "linkId": "H1/T1/Q3",
            "text": "Trouble falling or staying asleep, or sleeping too much?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "linkId": "H1/T1/Q4",
            "text": "Feeling tired or having little energy?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "linkId": "H1/T1/Q5",
            "text": "Poor appetite or overeating?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "linkId": "H1/T1/Q6",
            "text": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "linkId": "H1/T1/Q7",
            "text": "Trouble concentrating on things, such as reading the newspaper or watching television?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "linkId": "H1/T1/Q8",
            "text": "Moving or speaking so slowly that other people could gave noticed? Or so fidgety or restless that you have been moving a lot more than usual?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "linkId": "H1/T1/Q9",
            "text": "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
            "type": "choice",
            "answerValueSet": "#VSPHQ9"
          },
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
                "valueExpression": {
                  "description": "Score (0-4: None-minimal; 5-9: Mild; 19-14: Moderate; 15-19: Moderately severe; 20-27: Severe)",
                  "name": "score",
                  "language": "text/fhirpath",
                  "expression": "%resource.answers().value.ordinal().sum()"
                }
              }
            ],
            "linkId": "H1/TS",
            "code": [
              {
                "system": "http://loinc.org",
                "code": "44261-6",
                "display": "Patient Health Questionnaire 9 item (PHQ-9) total score [Reported]"
              }
            ],
            "text": "Patient health questionnaire 9 item total score",
            "type": "quantity"
          }
        ]
      }
    ]
  }

 */

const PatientSession = ({}) => {
    
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
    //const [questionnaires, setQuestionnaires] = useState<[]>([phq9])
    const [visitType, setVisitType] = useState('')
    const [contactType, setContactType] = useState('')
    const [flag, setFlag] = useState<string>()

    const navigate = useNavigate()
    const akello = useAkello()

    type ScoreDictionary = {
        [question: string]: any;
    };
    const [questionnaire_responses, setQuestionnaireResponses] = useState<{ [questionnaire: string] : ScoreDictionary }>({})

    
    useEffect(() => {
        const selectedRegistryId = akello.getSelectedRegistry()?.id;
        if (selectedRegistryId) {
            akello.registryService.getRegistry(selectedRegistryId, (data) => {                
                setQuestionnaires(data['questionnaires'])
            }, (error) => {
                console.log(error)
            })
        }
    }, [])

    useEffect(() => {
        console.log(questionnaire_responses)
    }, [questionnaire_responses])    
    

    const [mm, setMM] = useState(0)
    const [ss, setSS] = useState(0)
    //const [ms, setMS] = useState(0)

    const [noShow, setNoShow] = useState(false)
    

    if(questionnaires.length == 0) {
        return (
            <div>
                Loading...
            </div>
        )
    }


    return (
        <>
            <div className={"space-y-4 mx-auto"}>
                <div className={"border border-1"}>
                    <div className={"flex flex-row font-semibold border-b border-1 p-2"}>
                        <p className={"text-3xl font-semibold"}>
                            <StopWatch timeCallback={(mm, ss, _) => {
                                setMM(mm)
                                setSS(ss)
                                //setMS(ms)
                            }}/>
                        </p>
                        <div className={"flex flex-row space-x-4 my-auto"}>                                                                                     
                            <Button variant="filled" color="red" onClick={() => {}}>
                                cancel
                            </Button>
                            <Button variant="filled" onClick={() => {
                                
                                let scores = []                                   
                                for (let questionnaire_uid in questionnaire_responses) {
                                    let responses = questionnaire_responses[questionnaire_uid]["responses"];                                                               
                                    let score = 0                                    
                                    for(let response_id in responses) {
                                        score += questionnaire_responses[questionnaire_uid]["responses"][response_id]
                                    }                                    
                                    scores.push({
                                        score_questionnaire: questionnaire_uid,
                                        score_name: questionnaire_responses[questionnaire_uid]['name'],
                                        score_value: score
                                    })
                                    
                                }                                
                                const selectedRegistry = akello.getSelectedRegistry();
                                if (selectedRegistry) {
                                    akello.registryService.saveTreatmentSession(selectedRegistry.id, {
                                        patient_mrn: akello.getSelectedPatientRegistry()?.patient_mrn ?? '',
                                        contact_type: contactType,
                                        flag: flag,
                                        weeks_in_treatment: 0,
                                        visit_type: visitType,
                                        scores: scores,
                                        minutes: mm + (ss/60),
                                        no_show: noShow,
                                        date: Date.now() // UTC time
                                    }, (data) => {
                                        console.log(data)
                                        navigate('/registry/' + selectedRegistry.id);
                                    });
                                }

                            }}>
                                save session
                            </Button>
                            <div className='my-auto'>
                                <Checkbox                                    
                                        label="Patient did not show up for appointment"
                                        checked={noShow}
                                        onChange={(event) => setNoShow(event.currentTarget.checked)}
                                    />   
                            </div>
                            
                        </div>
                             
                        
                        
                        
                    </div>
                    
                    
                    <div className={"flex p-2"}>
                        <div className={"flex space-x-3"}>
                            <Select
                                label="Flag patient"
                                placeholder="Pick value"
                                data={['Needs Discussion', 'Review with Psychiatrist', 'Safety Risk']}
                                onChange={(value) => {
                                    setFlag(value ?? undefined)
                                }}
                            />   
                            <Select
                                label="Select Visit Type"
                                placeholder="Pick value"
                                data={['Clinic', 'Phone', 'In-person w/ Patient']}
                                onChange={(value) => {
                                    setVisitType(value ?? "")
                                }}
                            />                                
                            <Select
                                label="Select Contact Type"
                                placeholder="Pick value"
                                data={[
                                    'Initial Assessment', 
                                    'Follow Up', 
                                    'Psychiatric Consultation',
                                    'Relapse Prevention Plan'
                                ]}
                                onChange={(value) => {                                        
                                    setContactType(value ?? "")
                            }}/>                                                        
                        </div>
                    </div>
                </div>
                {
                    questionnaires.map((questionnaire: Questionnaire) => {                        
                        return (
                            <QuestionnaireForm 
                                questionnaire={questionnaire} 
                                onSelectedResponsesChange={(response) => {                                                                
                                    setQuestionnaireResponses((prevResponses) => ({
                                        ...prevResponses,
                                        [questionnaire.uid]: response
                                    }));
                                }} 
                            />
                        );
                    })            
                }
            </div>
        </>
    )
}

export default PatientSession