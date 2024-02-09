import React, { useState, useEffect } from 'react'
import {PatientRegistry, Questionnaire} from "@akello/core";
import {RegistryDataGrid} from "@akello/react";
import {useAkello} from "@akello/react-hook"
import { useNavigate } from 'react-router';

interface RegistryPageProps {
    drawerHandlers: any
}

const RegistryPage:React.FC<RegistryPageProps> = ({drawerHandlers}) => {
    const [patients, setPatients] = useState<PatientRegistry[]>([])
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
    const navigate = useNavigate()

    drawerHandlers.open()
    const akello = useAkello()    

    if(akello.getSelectedRegistry().id === undefined) {
        navigate('/')    
    }    

    useEffect(() => {                        
        akello.registryService.getRegistryPatients(akello.getSelectedRegistry().id, (data) => {                        
            setPatients(data['successfully_loaded'])
            setQuestionnaires(data['questionnaires'])            
            if(data['successfully_loaded'].length == 0) {
                navigate('/registry/'+akello.getSelectedRegistry().id+'/patient-referral')
            } else {
                akello.selectPatient(data['successfully_loaded'][0])
                akello.dispatchEvent({ type: 'change' });
            }            
        }, (data) => {            
        })
    }, [akello])

    return (
        <>
            <div className=''>
                <RegistryDataGrid patients={patients} questionnaires={Object.assign([], questionnaires)} handlePatientClickEvent={(object)=> {
                    const clickedPatient = object.row as PatientRegistry
                    akello.selectPatient(clickedPatient)   
                    akello.dispatchEvent({ type: 'change' });
                    console.log(clickedPatient.status)
                }} />    
            </div>
            
        </>
    )
}

export default RegistryPage