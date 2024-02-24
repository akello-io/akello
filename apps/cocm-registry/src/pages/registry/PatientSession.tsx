import StopWatch from "../../components/stopwatch/StopWatch";
import {useEffect, useState} from "react";
import {Button, Select, Checkbox} from "@mantine/core";
import { useAkello } from "@akello/react-hook";
import { useNavigate } from "react-router";
//import { QuestionnaireForm } from "@akello/react";
import QuestionnaireForm from "../../components/QuestionnaireForm";
import { v4 as uuidv4 } from 'uuid';



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
                                        id: uuidv4(),
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
                      if(questionnaire['type'] == "survey") {
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
                      }                        
                    })            
                }
            </div>
        </>
    )
}

export default PatientSession