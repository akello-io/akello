import StopWatch from "../../components/stopwatch/StopWatch";
import {useEffect, useState} from "react";
import {Button, Select, Container, Grid } from "@mantine/core";
import { useAkello } from "@akello/react-hook";
import { useNavigate } from "react-router";
import { Breadcrumbs, Anchor } from '@mantine/core';
import { Questionnaire } from "@akello/core";
import { notifications } from '@mantine/notifications';
//import { QuestionnaireForm } from "@akello/react";
import QuestionnaireForm from "../../components/QuestionnaireForm";
import { v4 as uuidv4 } from 'uuid';



const PatientSession = ({}) => {
    
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
    //const [questionnaires, setQuestionnaires] = useState<[]>([phq9])
    const [visitType, setVisitType] = useState('')
    const [contactType, setContactType] = useState('')
    const [flag, setFlag] = useState<string>()
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)

    const navigate = useNavigate()
    const akello = useAkello()

    type ScoreDictionary = {
        [question: string]: any;
    };
    const [questionnaire_responses, setQuestionnaireResponses] = useState<{ [questionnaire: string] : ScoreDictionary }>({})
    
    let patient = akello.getSelectedPatientRegistry()
    const items = [
        { title: 'Registry', href: '/registry' },
        { title: patient?.first_name + ' ' + patient?.last_name, href: '/registry/' + patient?.patient_mrn },
        { title: 'Treatment Session', href: '#' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));
    
    useEffect(() => {
        const selectedRegistryId = akello.getSelectedRegistry()?.id;
        if (selectedRegistryId) {
            akello.registryService.getRegistry(selectedRegistryId, (data: any) => {                
                setQuestionnaires(data['questionnaires'].filter((questionnaire: Questionnaire) => questionnaire.active === true))
            }, (error: any) => {
                console.log(error)
            })
        }
    }, [])


    useEffect(() => {        
        let total_questionnaires_answered = 0
        questionnaires.map((questionnaire: Questionnaire) => {            
            if(questionnaire_responses[questionnaire.uid]) {                
                if(Object.keys(questionnaire_responses[questionnaire.uid].responses).length == questionnaire.measurements.length) {                                        
                    total_questionnaires_answered += 1                    
                }
            }            
        })
 
        if(total_questionnaires_answered!=0 && total_questionnaires_answered == questionnaires.length) {                                    
            setAllQuestionsAnswered(true)
        }

    }, [questionnaire_responses])

    const [mm, setMM] = useState(0)
    const [ss, setSS] = useState(0)
    //const [ms, setMS] = useState(0)
    

    if(questionnaires.length == 0) {
        return (
            <div>
                Loading...
            </div>
        )
    }    


    const saveTreatmentSession = (no_show?: boolean) => {
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
                no_show: no_show,
                date: Date.now() // UTC time
            }, (data: any) => {   
                console.log(data)      
                notifications.show({
                    title: patient?.first_name + ' ' + patient?.last_name + ' Treatment Session Completed',
                    message: 'Session completed for ' + patient?.first_name + ' ' + patient?.last_name +'. Total time: ' + mm + ' minutes ' + ss + ' seconds',
                })

                navigate('/registry/' + akello.getSelectedPatientRegistry()?.patient_mrn);
            });
        }
    }


    return (
        <>        
            <div className={"space-y-4 mx-auto"}>
                <Breadcrumbs>{items}</Breadcrumbs>
                <Container fluid >
                    <Container fluid>
                        <div className={"flex flex-row font-semibold p-2"}>
                            <p className={"text-3xl font-semibold"}>
                                <StopWatch timeCallback={(mm, ss, _) => {
                                    setMM(mm)
                                    setSS(ss)
                                    //setMS(ms)
                                }}/>
                            </p>                        
                        </div>
                    </Container>                    
                    <Container fluid>
                            <Grid grow gutter="md">                                
                                <Grid.Col span={0}>
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
                                <Grid.Col span={0}>
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
                                    <Select
                                        label="Flag patient"
                                        placeholder="Pick value"
                                        data={['Needs Discussion', 'Review with Psychiatrist', 'Safety Risk']}
                                        onChange={(value) => {
                                            setFlag(value ?? undefined)
                                        }}
                                    />   
                                </Grid.Col>
                                
                            </Grid>     
                            <Grid>
                                {
                                    visitType && contactType && (
                                        <>                                            
                                            <Grid.Col span={0}>
                                                <Button variant="filled" 
                                                    disabled={!allQuestionsAnswered}
                                                    onClick={() => {                                
                                                    saveTreatmentSession()                                                    
                                                }}>
                                                    save session
                                                </Button>
                                            </Grid.Col>
                                            <Grid.Col span={0}>
                                                <div className='my-auto'>
                                                    <Button variant="default" onClick={() => {                                                        
                                                        saveTreatmentSession(true)                                                        
                                                    }
                                                    }>
                                                        No Show
                                                    </Button>                                                    
                                                </div>
                                            </Grid.Col>
                                        </>
                                    )
                                }
                            
                            </Grid>
                                                                                                 
                        </Container>
                </Container>
                {
                    visitType && contactType && (
                        <div>
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
                    )
                    
                }
            </div>
        </>
    )
}

export default PatientSession