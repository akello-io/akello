import React, { useState, useEffect } from 'react'
import {PatientRegistry, Questionnaire} from "@akello/core";
import {RegistryDataGrid} from "@akello/react";
import {useAkello, useSelectedRegistry} from "@akello/react-hook"
import { useNavigate, useParams } from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { em, LoadingOverlay, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useMediaQuery } from '@mantine/hooks';


interface RegistryPageProps {
    drawerHandlers: any
}

const RegistryPage:React.FC<RegistryPageProps> = ({drawerHandlers}) => {
    const [patients, setPatients] = useState<PatientRegistry[]>([])
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
    const navigate = useNavigate()
    const {patient_id} = useParams()
    const akello = useAkello()    
    const selectedRegistry = useSelectedRegistry()
    const isMobile = useMediaQuery(`(max-width: ${em(880)})`);
    const [visible, { open, close, toggle }] = useDisclosure(false);


    const muiTheme = createTheme({
        typography: {
            fontFamily: [
              'Work Sans',
            ].join(','),
          },
      });
        

    useEffect(() => {
        drawerHandlers.open()
    })

    useEffect(() => {                           
        if (selectedRegistry) {
            const registryId = selectedRegistry.id;            
            if (registryId) {                
                open()
                akello.registryService.getRegistryPatients(registryId, (data) => {                        
                    close()
                    setPatients(data['successfully_loaded'])
                    setQuestionnaires(data['questionnaires'].filter((questionnaire: Questionnaire) => questionnaire.active === true))        
                    if(data['successfully_loaded'].length == 0) {                        
                        navigate('/patient-referral')
                    } else {
                        data['successfully_loaded'].forEach((patient: PatientRegistry) => {
                            if(patient.patient_mrn == patient_id) {
                                akello.selectPatient(patient)
                                akello.dispatchEvent({ type: 'change' });
                            }
                        })                        
                    }            
                }, (data) => {   
                    close()                   
                })
            }
        }        
    }, [akello, selectedRegistry])
        

    return (
        <>
            <div className=''>
                <ThemeProvider theme={muiTheme}>
                    <Box pos="relative">
                        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />                        
                        <RegistryDataGrid patients={patients} questionnaires={Object.assign([], questionnaires)} handlePatientClickEvent={(object)=> {                        
                            const clickedPatient = object.row as PatientRegistry                    
                            const registryId = akello.getSelectedRegistry()?.id;
                            akello.selectPatient(clickedPatient)   
                            akello.dispatchEvent({ type: 'change' });
                            if(isMobile) {                            
                                navigate('/registry/'+registryId+'/patient/'+clickedPatient.patient_mrn)
                            } else {                            
                                navigate('/registry/'+clickedPatient.patient_mrn)
                            }
                        }} />    
                    </Box>
                    
                </ThemeProvider>
                
            </div>
            
        </>
    )
}

export default RegistryPage