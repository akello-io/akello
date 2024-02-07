import React, { useState, useEffect } from 'react'
import {useAkello} from "@akello/react-hook"
import {RegistryMemberships, WelcomeBanner, Loader, RegistrySelectRow} from "@akello/react"
import { useNavigate } from 'react-router-dom'
import { Grid, Container } from '@mantine/core';


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
        <div className="px-24 overscroll-hidden overscroll-none	">
            <WelcomeBanner first_name={"Vijay"} />                    
            <RegistryMemberships onCreate={() => navigate('/registry/create')}>
                {
                    !isLoading && registries.map((registry) => {
                        return (
                            <>
                            <RegistrySelectRow 
                                id={"registry['id']"} 
                                onClick={() => {
                                    navigate(`/registry/${registry['id']}`)
                                    akello.selectRegistry(registry['id'])  
                                    debugger
                                }}
                                name={registry['name']}
                                members={registry['members']}
                                logo_url={""}
                                patients={-1}
                                screeners={-1}
                            />
                            </>
                        )
                    })
                }
            </RegistryMemberships>    
        </div>
    )
}

export default AppHomePage