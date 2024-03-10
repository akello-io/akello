import React, { useState, useEffect } from 'react'
import {PatientRegistry, Questionnaire} from "@akello/core";
import {RegistryDataGrid} from "@akello/react";
import {useAkello} from "@akello/react-hook"
import { useNavigate } from 'react-router';
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

    drawerHandlers.open()
    const akello = useAkello()    

    const isMobile = useMediaQuery(`(max-width: ${em(880)})`);

    if (akello.getSelectedRegistry()?.id === undefined) {
        navigate('/');
    }    


    const muiTheme = createTheme({
        typography: {
            fontFamily: [
              'Work Sans',
            ].join(','),
          },
      });
        


    useEffect(() => {                        
        if (akello.getSelectedRegistry()) {
            const registryId = akello.getSelectedRegistry()?.id;
            if (registryId) {
                akello.registryService.getRegistryPatients(registryId, (data) => {                        
                    setPatients(data['successfully_loaded'])
                    setQuestionnaires(data['questionnaires'])            
                    if(data['successfully_loaded'].length == 0) {                        
                        navigate('/registry/'+registryId+'/patient-referral')
                    } else {
                        akello.selectPatient(data['successfully_loaded'][0])
                        akello.dispatchEvent({ type: 'change' });
                    }            
                }, (data) => {   
                    console.log(data)         
                })
            }
        }
    }, [akello])
    
    

    return (
        <>
            <div className=''>
                <ThemeProvider theme={muiTheme}>
                    <RegistryDataGrid patients={patients} questionnaires={Object.assign([], questionnaires)} handlePatientClickEvent={(object)=> {
                        const clickedPatient = object.row as PatientRegistry                    
                        akello.selectPatient(clickedPatient)   
                        akello.dispatchEvent({ type: 'change' });                    
                        if(isMobile) {
                            const registryId = akello.getSelectedRegistry()?.id;
                            navigate('/registry/'+registryId+'/patient/'+clickedPatient.patient_mrn)
                        }
                    }} />    
                </ThemeProvider>
                
            </div>
            
        </>
    )
}

export default RegistryPage