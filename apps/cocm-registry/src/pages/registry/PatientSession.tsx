import * as React from "react";
import StopWatch from "../../components/stopwatch/StopWatch";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {Dropdown} from "@akello/react";
import {Button, Select, Radio, Group, Switch} from "@mantine/core";
import {
    PatientRegistry,
    Questionnaire,
    QuestionnaireQuestion,
    QuestionnaireResponse
} from "@akello/core";
import { useAkello } from "@akello/react-hook";
import { useNavigate } from "react-router";

import QuestionnaireForm from "../../components/QuestionnaireForm";



interface SelectorProps {
    selectedId?: number
    question: QuestionnaireQuestion
    onSelection: (response: QuestionnaireResponse) => void
}
const Selector:React.FC<SelectorProps> = ({selectedId, onSelection, question}) => {
    const [selectedResponseId, setSelectedResponseId] = useState(0)

    useEffect(() => {
        console.log(selectedResponseId)        
    }, [selectedResponseId])

    return (
        <>
            <Radio.Group                
                name={question.id}
                label={question.question}                
                description="This is anonymous"
                withAsterisk>
                    <Group mt="xs">                
                        {
                            question.responses.map((response) => {                                 
                                return (
                                    <Radio checked={response.id===selectedResponseId}  label={response.response} value={response.response} onClick={(event) => {
                                        onSelection(response)
                                        setSelectedResponseId(response.id)
                                    }}  />
                                )
                            })
                        }                                
                    </Group>
            </Radio.Group>
        </>
    )    
}

interface StartSessionTabProps {
    setSelectedTab: (tab: string) => void
    selectedPatient: PatientRegistry
    questionnaires: Questionnaire[]
    setSelectedPatient: (patient: PatientRegistry) => void
}

const PatientSession = ({}) => {
    
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
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
        akello.registryService.getRegistry(akello.getSelectedRegistry().id, (data) => {
            setQuestionnaires(data['questionnaires'])            
        }, (error) => {
            debugger;
        })
    }, [])

    useEffect(() => {
        console.log(questionnaire_responses)
    }, [questionnaire_responses])    
    

    const [mm, setMM] = useState(0)
    // const [ss, setSS] = useState(0)
    // const [ms, setMS] = useState(0)

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
                        <p className={"text-xl my-auto"}>
                            <StopWatch timeCallback={(mm, ss, ms) => {
                                setMM(mm)
                                // setSS(ss)
                                // setMS(ms)
                            }}/>
                        </p>
                        
                        <div className={"flex flex-row space-x-4 my-auto"}>
                            <div>
                                <p className={"text-sm"}>
                                    No Show
                                </p>
                                <Switch
                                    checked={noShow}
                                    onChange={(event) => setNoShow(event.currentTarget.checked)}
                                />
                                
                            </div>
                            <Button variant="filled" color="red" onClick={() => setSelectedTab("Main")}>
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
                                akello.registryService.saveTreatmentSession(akello.getSelectedRegistry().id, {
                                    patient_mrn: akello.getSelectedPatientRegistry().patient_mrn,
                                    contact_type: contactType,
                                    flag: flag,
                                    weeks_in_treatment: 0,
                                    visit_type: visitType,
                                    scores: scores,
                                    minutes: mm,
                                    no_show: noShow,
                                    date: Date.now() // UTC time
                                }, (data) => {
                                    // let treatment_logs = [...selectedPatient.treatment_logs!, data]
                                    // selectedPatient.treatment_logs = treatment_logs
                                    debugger;
                                    navigate('/registry/' + akello.getSelectedRegistry().id)
                                })

                            }}>
                                save session
                            </Button>
                        </div>
                    </div>
                    
                    <div className={"flex p-2"}>
                        <div className={"flex space-x-3"}>
                            <Select
                                label="Flag patient"
                                placeholder="Pick value"
                                data={['Needs Discussion', 'Review with Psychiatrist', 'Safety Risk']}
                                onChange={(value) => {
                                    setFlag(value)
                                }}
                            />   
                            <Select
                                label="Select Visit Type"
                                placeholder="Pick value"
                                data={['Clinic', 'Phone', 'In-person w/ Patient']}
                                onChange={(value) => {
                                    setVisitType(value)
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
                                    setContactType(value)
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