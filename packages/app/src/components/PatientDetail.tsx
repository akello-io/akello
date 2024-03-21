import {PatientProgressChart} from "@akello/react";
import {PatientTreatmentHistoryDataGrid} from "@akello/react";
import { useAkello } from "@akello/react-hook";
import {Select, Container, Button, ThemeIcon, SegmentedControl, Anchor} from '@mantine/core';
import { useNavigate } from "react-router";
import { IconPhone } from "@tabler/icons-react";
import { notifications } from '@mantine/notifications';


const PatientDetail = () => {       
    const akello = useAkello();    
    const selectedPatient = akello.getSelectedPatientRegistry();        
    const selectedRegistry = akello.getSelectedRegistry();    
    
    const navigate = useNavigate();    
    
    if(selectedPatient === undefined) {
        return (
            <></>
        )
    }         
    
    return (
        <>
            <div className={"space-y-4 h-screen overflow-scroll	"}>
                <div className={"w-full border border-1"}>
                    <div className={"flex flex-row justify-between border-b border-1 px-3 py-2"}>
                        <div className='flex flex-col'>
                            <div className={"text-xl font-semibold"}>
                                {selectedPatient.first_name} {selectedPatient.last_name}
                            </div>
                            <Anchor size="md" href={"mailto:" + selectedPatient.email} target="_blank">
                                {selectedPatient.email}
                            </Anchor>                            
                            <div className={"text-sm"}>
                                Referring NPI: {selectedPatient.referring_provider_npi}    
                            </div>
                        </div>                          
                        <div className='flex flex-row space-x-3'>
                            <ThemeIcon>
                                <IconPhone style={{  width: '70%', height: '70%' }} />
                            </ThemeIcon>                   
                            <a className={'text-md'} href={'tel:' + selectedPatient.phone_number}>{selectedPatient.phone_number}</a>
                        </div>                                            
                    </div>
                    <div className={"p-2"}>
                        <div className={"grid grid-cols-2 space-y-6"}>  
                                                    
                            <div className={'col-span-2'}>
                                <Select
                                        placeholder="Select patient flag "                                
                                        clearable                                        
                                        defaultValue={selectedPatient.flag}
                                        value={selectedPatient.flag}
                                        data={[                        
                                            'Needs Discussion',
                                            'Review with Psychiatrist',
                                            'Safety Risk'
                                        ]}
                                        onChange={(value) => {
                                            const selectedRegistry = akello.getSelectedRegistry();
                                            const patientMRN = selectedPatient?.patient_mrn;                                            
                                            if (selectedRegistry && patientMRN) {
                                                const previousSelectedFlagValue = selectedPatient.flag;
                                                selectedPatient.flag = value !== null ? value : undefined;
                                                akello.selectPatient(selectedPatient);
                                                akello.dispatchEvent({ type: 'change' });

                                                akello.registryService.setFlag(selectedRegistry.id, patientMRN, value !== null ? value : '', () => {                                                
                                                    if (value !== null) {
                                                        notifications.show({
                                                            color: 'green',
                                                            title: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' Flagged',
                                                            message: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' has been flagged as ' + value,
                                                        })
                                                    } else {
                                                        notifications.show({
                                                            color: 'green',
                                                            title: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' Unflagged',
                                                            message: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' has unflagged',
                                                        })
                                                    }
                                                },  (error: any) => {
                                                    console.error(error);
                                                    selectedPatient.flag = previousSelectedFlagValue;
                                                    akello.selectPatient(selectedPatient);
                                                    akello.dispatchEvent({ type: 'change' });
                                                    notifications.show({
                                                        color: 'red',
                                                        title: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' Error',
                                                        message: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' unable to set flag',
                                                    })
                                                });
                                            }

                                            
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
                                defaultValue={selectedPatient.status}
                                value={selectedPatient.status}
                                onChange={(value) => {
                                    const selectedRegistry = akello.getSelectedRegistry();                                    
                                    if (selectedRegistry) {
                                        const previousSelectedStatusValue = selectedPatient.status;
                                        selectedPatient.status = value;                                            
                                        akello.selectPatient(selectedPatient);
                                        akello.dispatchEvent({ type: 'change' });
                                        akello.registryService.setStatus(selectedRegistry.id, selectedPatient.patient_mrn, value, () => {                                            
                                            notifications.show({
                                                color: 'green',
                                                title: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' Status Changed',
                                                message: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' has been moved to ' + value,
                                            })
                                        },  (error: any) => {                                                                                      
                                            console.error(error);
                                            selectedPatient.status = previousSelectedStatusValue;
                                            akello.selectPatient(selectedPatient);
                                            akello.dispatchEvent({ type: 'change' });
                                            notifications.show({
                                                color: 'red',
                                                title: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' Error',
                                                message: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' unable to change status',
                                            })
                                        }
                                        );
                                    }
                                }}
                            />

                        </div>
                    </div>
                </div>
                <Container size="xs">                    
                    <Button color={'red'} fullWidth onClick={() => navigate('/patient/' + (akello.getSelectedPatientRegistry()?.id ?? '') + '/treatment-session')}>
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
                                    <PatientProgressChart selectedPatient={selectedPatient} questionnaires={selectedRegistry?.measurements.filter((measurement) => measurement.active === true) ?? []} />
                                </div>
                            </div>

                            <div className={"w-full border border-1"}>
                                <div className={"font-semibold border-b border-1 p-2"}>
                                    <p className={"text-xl"}>
                                        Treatment History
                                    </p>
                                </div>
                                <div className={"p-2"}>
                                    <PatientTreatmentHistoryDataGrid selectedPatient={selectedPatient} questionnaires={selectedRegistry?.measurements.filter((measurement) => measurement.active === true) ?? []} />                                    
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