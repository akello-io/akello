import StopWatch from "../../components/stopwatch/StopWatch";
import {useEffect, useState} from "react";
import {Button, Select, Checkbox, Container, Grid, Text} from "@mantine/core";
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
                    </div>
                    <Container fluid my={5} bg="var(--mantine-color-blue-light)">
                            <Grid grow gutter="xs">
                                <Grid.Col span={4}>
                                    <Select
                                        label="Flag patient"
                                        placeholder="Pick value"
                                        data={['Needs Discussion', 'Review with Psychiatrist', 'Safety Risk']}
                                        onChange={(value) => {
                                            setFlag(value ?? undefined)
                                        }}
                                    />   
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Select
                                        withAsterisk
                                        label="Select Visit Type"
                                        placeholder="Pick value"
                                        data={['Clinic', 'Phone', 'In-person w/ Patient']}
                                        onChange={(value) => {
                                            setVisitType(value ?? "")
                                        }}
                                    />  
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Select
                                        withAsterisk
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
                                </Grid.Col>
                                <Grid.Col span={0}>
                                    <Button variant="filled" color="red"  onClick={() => {}}>
                                        cancel
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={0}>
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
                                                navigate('/registry/' + selectedRegistry.id);
                                            });
                                        }

                                    }}>
                                        save session
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={0}>
                                    <div className='my-auto'>
                                        <Checkbox                                    
                                                label="No show"
                                                checked={noShow}
                                                onChange={(event) => setNoShow(event.currentTarget.checked)}
                                            />   
                                    </div>  
                                </Grid.Col>
                            </Grid>                                                                          
                        </Container>
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