import React, { useState, useEffect } from 'react'
import {useAkello} from "@akello/react-hook"
import {RegistryMemberships, WelcomeBanner, Loader, RegistrySelectRow} from "@akello/react"
import { useNavigate } from 'react-router-dom'
import { Grid, Container } from '@mantine/core';
import RegistryCard from '../components/RegistryCard';

interface AppHomePageProps {
    drawerHandlers: any
}

const AppHomePage:React.FC<AppHomePageProps> = ({drawerHandlers}) => {
    // drawerHandlers.close()
    const navigate = useNavigate()
    const akello = useAkello()
    const [registries, setRegistries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
            akello.userService.getUserRegistries((data) => {                
                setRegistries(data)
                setIsLoading(false)
            })
    }, [])


    return (
        <div className="lg:px-24 overscroll-hidden overscroll-none	space-y-12">
            <WelcomeBanner first_name={"Vijay"} />                    
            <div className='space-y-3'>
            {
                !isLoading && registries.map((registry) => {
                    return (
                        <>
                            <RegistryCard
                                id={registry['id']}
                                name={registry['name']}
                                description={'description information here...'}
                                safetyRisk={4}
                                minutesTracked={12}
                                totalMinutes={24}
                                totalPatients={12}
                                avgTreatmentDuration={12}
                                avatars={[
                                    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
                                    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png'                                
                                ]}
                                needsDiscussion={3} // Add the 'needsDiscussion' property here
                            />                            
                        </>
                    )
                })
            }            
            </div>
            
        </div>
    )
}

export default AppHomePage