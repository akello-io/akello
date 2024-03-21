import React, { useState, useEffect } from 'react'
import {PatientRegistry, Questionnaire} from "@akello/core";
import {RegistryDataGrid} from "@akello/react";
import {useAkello} from "@akello/react-hook"
import { useNavigate, useParams } from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { em } from '@mantine/core';

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
    const isMobile = useMediaQuery(`(max-width: ${em(880)})`);

   

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
        if (akello.getSelectedRegistry()) {
            const registryId = akello.getSelectedRegistry()?.id;            
            if (registryId) {
                akello.registryService.getRegistryPatients(registryId, (data) => {                        
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
                    
                })
            }
        }        
    }, [akello, akello.getSelectedRegistry()])
        

    return (
        <>
            <div className=''>
                <ThemeProvider theme={muiTheme}>
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
                </ThemeProvider>
                
            </div>
            
        </>
    )
}

export default RegistryPage