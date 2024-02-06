import React, { useState, useEffect } from 'react'
import {useAkello} from "@akello/react-hook"
import {RegistryMemberships, Loader, RegistrySelectRow} from "@akello/react"
import { useNavigate } from 'react-router-dom'

interface AppHomePageProps {
    drawerHandlers: any
}

const AppHomePage:React.FC<AppHomePageProps> = ({drawerHandlers}) => {
    drawerHandlers.close()
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
        <>
            App Home
            {
                isLoading ? <Loader /> : 
                    <RegistryMemberships
                        onCreate={() => {
                            debugger;
                            navigate('/registry/create')
                        }}>

                        {
                            !isLoading && registries.map((registry) => {
                                return (
                                    <>
                                    <RegistrySelectRow 
                                        id={registry['id']} 
                                        onClick={() => {                                              
                                            akello.selectRegistry(registry['id'])                                            
                                            navigate(`/registry/${registry['id']}`)
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
            }
 
        </>
    )
}

export default AppHomePage