import {PatientProgressChart, Dropdown} from "@akello/react";
import {PatientTreatmentHistoryDataGrid} from "@akello/react";
import {PatientRegistry, Questionnaire} from "@akello/core";
import moment from "moment";
import { useAkello } from "@akello/react-hook";
import {Select, Container, Grid, Button, ScrollArea, ThemeIcon, SegmentedControl} from '@mantine/core';
import { useNavigate } from "react-router";
import { IconPhone, IconFlag } from "@tabler/icons-react";
import TreatmentProgress from './treatment-progress/TreatmentProgress';

const PatientDetail = () => {       
    const akello = useAkello();    
    const selectedPatient = akello.getSelectedPatientRegistry();        
    const selectedRegistry = akello.getSelectedRegistry();    
    
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
        
    } else {
        console.log(selectedPatient.patient_flag);
    }    

    return (
        <>
            <div className={"space-y-4 h-screen overflow-scroll	"}>
                <div className={"w-full border border-1"}>
                    <div className={"flex flex-row justify-between  border-b border-1 px-3 py-2"}>
                        <div className='flex flex-col'>
                            <div className={"text-xl font-semibold"}>
                                {selectedPatient.first_name} {selectedPatient.last_name}
                            </div>
                            <div className={'text-xs font-light text-gray-600'}>
                                vijay@g.com
                            </div>                            
                        </div>     
                        <div className='flex flex-row space-x-3'>
                            <ThemeIcon>
                                <IconPhone style={{ width: '70%', height: '70%' }} />
                            </ThemeIcon>                   
                            <div className={'text-md'}>{selectedPatient.phone_number}</div>
                        </div>                        
                    </div>
                    <div className={"p-2"}>
                        <div className={"grid grid-cols-2 space-y-6"}>  
                            <div className='col-span-2'>
                                <TreatmentProgress weeks={getWeeksSince(selectedPatient.initial_assessment!)} />
                            </div>                            
                            <div className={'col-span-2'}>
                                <Select
                                        placeholder="Select patient flag "                                
                                        clearable
                                        fullWidth
                                        defaultValue={akello.getSelectedPatientRegistry()?.patient_flag}
                                        data={[                        
                                            'Needs Discussion',
                                            'Review with Psychiatrist',
                                            'Safety Risk'
                                        ]}
                                        onChange={(value) => {
                                            akello.registryService.setFlag(akello.getSelectedRegistry().id, selectedPatient.patient_mrn, value, () => {                                                
                                                selectedPatient.patient_flag = value;
                                                akello.selectPatient(selectedPatient);                                                
                                                akello.dispatchEvent({ type: 'change' });                                                
                                            })
                                        }}
                                    />       
                            </div>                                                                                 
                            <SegmentedControl fullWidth data={[                        
                                    'Enrolled',
                                    'Treatment',
                                    'Relapse Prevention Plan',
                                    'Deactivated'
                                ]}
                                className='col-span-2' 
                                defaultValue={akello.getSelectedPatientRegistry()?.status}                                
                                onChange={(value) => {
                                    akello.registryService.setStatus(akello.getSelectedRegistry().id, selectedPatient.patient_mrn, value, () => {                                                                                
                                        selectedPatient.status = value;
                                        akello.selectPatient(selectedPatient);
                                        akello.dispatchEvent({ type: 'change' });
                                    })
                                }}
                            />

                        </div>
                    </div>
                </div>
                <Container size="xs">
                    <Button color="pink" fullWidth onClick={() => navigate('/registry/' + akello.getSelectedRegistry().id + '/patient/' + akello.getSelectedPatientRegistry().id + '/treatment-session')}>
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
                                    <PatientProgressChart selectedPatient={selectedPatient} questionnaires={selectedRegistry?.questionnaires} />
                                </div>
                            </div>

                            <div className={"w-full border border-1"}>
                                <div className={"font-semibold border-b border-1 p-2"}>
                                    <p className={"text-xl"}>
                                        Treatment History
                                    </p>
                                </div>
                                <div className={"p-2"}>
                                <PatientTreatmentHistoryDataGrid selectedPatient={selectedPatient} questionnaires={selectedRegistry?.questionnaires} />                                    
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