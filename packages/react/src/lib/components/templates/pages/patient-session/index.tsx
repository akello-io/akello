
import {useEffect, useState} from "react";
import {Button, Select, Container, Grid, Input, TextInput, Affix } from "@mantine/core";
import { useAkello } from "@akello/react-hook";
import { Breadcrumbs, Anchor } from '@mantine/core';
import { Questionnaire } from "@akello/core";
import { notifications } from '@mantine/notifications';
import { QuestionnaireForm } from "../../../molecules";
import { StopWatch } from "../../../molecules";
import { v4 as uuidv4 } from 'uuid';


interface PatientSessionProps {
    onNavigate: (path: string) => void
}

export const PatientSession:React.FC<PatientSessionProps> = ({onNavigate}) => {

    const [loaded, setLoaded] = useState(false)
    const [visitType, setVisitType] = useState('')
    const [contactType, setContactType] = useState('')
    const [flag, setFlag] = useState<string>()
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)
    const [cpNPI, setCPNPI] = useState('')
    const [problemsList, setProblemsList] = useState('')
    const [showScreeners, setShowScreeners] = useState(false)

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

        if(contactType == 'Psychiatric Consultation' && cpNPI && problemsList && visitType) {
            setShowScreeners(true)
        } else if(contactType != 'Psychiatric Consultation' && visitType && contactType){
            setShowScreeners(true)
        } else {
            setShowScreeners(false)
        }

    }, [visitType, contactType, cpNPI, problemsList])


    useEffect(() => {
        let total_questionnaires_answered = 0
        akello.getSelectedRegistry()?.measurements.map((questionnaire: Questionnaire) => {
            if(questionnaire_responses[questionnaire.uid]) {
                if(Object.keys(questionnaire_responses[questionnaire.uid].responses).length == questionnaire.measurements.length) {
                    total_questionnaires_answered += 1
                }
            }
        })

        if(total_questionnaires_answered!=0 && total_questionnaires_answered == akello.getSelectedRegistry()?.measurements.length) {
            setAllQuestionsAnswered(true)
        }

    }, [questionnaire_responses])

    const [mm, setMM] = useState(0)
    const [ss, setSS] = useState(0)
    //const [ms, setMS] = useState(0)

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
                cp_npi: cpNPI,
                problems_list: problemsList,
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

                onNavigate('/registry/' + akello.getSelectedPatientRegistry()?.patient_mrn);
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
                                {
                                            visitType && contactType && (
                                                <>
                                                    <div className='flex flex-col align-bottom mt-8'>
                                                        <Button variant="default"  onClick={() => {
                                                                        saveTreatmentSession(true)
                                                                }
                                                                }>
                                                                    No Show
                                                        </Button>
                                                    </div>

                                                </>
                                            )
                                        }

                            </Grid>

                            {contactType == 'Psychiatric Consultation' && (
                                <>
                                <Grid>

                                        <Grid.Col span={0}>
                                            <TextInput
                                                required
                                                label="CP NPI"
                                                description="NPI for the Consulting Psychaitrist"
                                                placeholder="Enter NPI"
                                                onChange={(event) => {
                                                    setCPNPI(event.currentTarget.value)
                                                }}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={0}>
                                            <TextInput
                                                required
                                                label="Problems List"
                                                description="Enter commas separated list of problems (ICD-10 Codes)"
                                                placeholder="List of ICD-10 codes"
                                                onChange={(event) => {
                                                    setProblemsList(event.currentTarget.value)
                                                }}
                                            />
                                        </Grid.Col>
                                </Grid>

                                </>
                                )}

                            <Grid>


                            </Grid>

                        </Container>
                </Container>
                {
                    showScreeners && (
                        <div>
                            {
                                 akello.getSelectedRegistry()?.measurements.map((questionnaire: Questionnaire) => {
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
                            <Button variant="filled"
                                    mt={24}
                                    disabled={!allQuestionsAnswered}
                                    onClick={() => {
                                    saveTreatmentSession()
                                }}>
                                    save session
                                </Button>

                        </div>
                    )

                }
            </div>
        </>
    )
}
