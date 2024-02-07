import {PatientProgressChart, Dropdown} from "@akello/react";
import {PatientTreatmentHistoryDataGrid} from "@akello/react";
import {PatientRegistry, Questionnaire} from "@akello/core";
import moment from "moment";
import { useAkello } from "@akello/react-hook";
import {Select, Container, Grid, Button } from '@mantine/core';
import { useNavigate } from "react-router";

const PatientDetail = () => {       
    const akello = useAkello();
    const selectedPatient = akello.getSelectedPatientRegistry();    
    const questionnaires: Questionnaire[] = [];
    
    const navigate = useNavigate();
    const getWeeksSince = (date: number) => {
        var today = moment(date);
        var ia = moment();
        var diff = moment.duration(ia.diff(today));
        return diff.weeks();
    };


    if(selectedPatient === undefined) {
        return (
            <></>
        )
    } 
    
    
    if(selectedPatient.patient_flag === null) {    
        debugger;    
    } else {
        console.log(selectedPatient.patient_flag);
    }

    return (
        <>
            <div className={"space-y-4"}>
                <div className={"w-full border border-1"}>
                    <div className={"flex flex-row justify-between  border-b border-1 px-3 py-2"}>
                        <p className={"text-xl font-semibold"}>
                            {selectedPatient.first_name} {selectedPatient.last_name}
                        </p>                        
                        <div className={'text-md'}>{selectedPatient.phone_number}</div>
                    </div>
                    <div className={"p-2"}>
                        <div className={"grid grid-cols-2"}>                                                                                   
                            <div className={"font-semibold"}>Treatment Week</div>
                            <div>
                                {
                                    selectedPatient.initial_assessment != undefined && (
                                        <div>{getWeeksSince(selectedPatient.initial_assessment!)}</div>
                                    )
                                }
                            </div>

                            <div className={"font-semibold"}>Flag</div>
                            <Select
                                    placeholder="Select patient flag "                                
                                    value={selectedPatient.patient_flag}
                                    data={[                        
                                        'Needs Discussion',
                                        'Review with Psychiatrist',
                                        'Safety Risk'
                                    ]}
                                    onChange={(value) => {
                                        akello.registryService.setFlag(akello.getSelectedRegistry().id, selectedPatient.patient_mrn, value, () => {
                                            // setSelectedPatient({...selectedPatient, flag: option})
                                        })
                                    }}
                                />
                            <div className={"font-semibold"}>Status</div>
                            <Select
                                placeholder="Set patient status"        
                                value={selectedPatient.status}                        
                                data={[                        
                                    'Enrolled',
                                    'Treatment',
                                    'Relapse Prevention Plan',
                                    'Deactivated'
                                ]}
                                onChange={(value) => {
                                    akello.registryService.setStatus(akello.getSelectedRegistry().id, selectedPatient.patient_mrn, value, () => {
                                        // setSelectedPatient({...selectedPatient, flag: option})
                                    })
                                }}
                            />                                
                            
                        </div>
                    </div>
                </div>
                <Container size="xs">
                    <Button fullWidth onClick={() => navigate('/registry/' + akello.getSelectedRegistry().id + '/patient/' + akello.getSelectedPatientRegistry().id)}>
                        Start Session
                    </Button>
                </Container>
                {
                    selectedPatient.treatment_logs!.length > 0 && (
                        <>
                            <div className={"w-full border border-1"}>
                                <div className={"font-semibold border-b border-1 p-2"}>
                                    <p className={"text-xl"}>
                                        Patient Progress Chart
                                    </p>
                                </div>
                                <div className={"p-2 h-64 w-full"}>
                                    <PatientProgressChart selectedPatient={selectedPatient} questionnaires={questionnaires} />
                                </div>
                            </div>

                            <div className={"w-full border border-1"}>
                                <div className={"font-semibold border-b border-1 p-2"}>
                                    <p className={"text-xl"}>
                                        Treatment History
                                    </p>
                                </div>
                                <div className={"p-2"}>
                                    <PatientTreatmentHistoryDataGrid selectedPatient={selectedPatient} questionnaires={questionnaires} />
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default PatientDetail