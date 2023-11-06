import { TopNavigation, WelcomeTemplate, RegistrySelectRow, RegistryMemberships } from '@akello/react'
import { AkelloAPIService } from '@akello/core'
import {useEffect, useState} from "react";
import AkelloLogo from '../../src/images/logos/akello/akello-corner-logo.svg'
import AkelloWhite from '../../src/images/logos/akello/akello-white-logo.png'

interface HomePageProps {
    token: string
}

const HomePage:React.FC<HomePageProps> = ({token}) => {
    const service = new AkelloAPIService(token)
    const [registeries, setRegisteries] = useState([])

    useEffect(() => {
        service.getUserRegistries((data: any) => {
            setRegisteries(data)
        }, (data: any) => {

        })
    }, [token])



    return (
        <>
            <TopNavigation
                classNames={'px-24 bg-ak-dark-blue'}
                logo={AkelloWhite}
                createRegistry={() => console.log('create registry clicked')}
                logout={() => {}}
                email={'vijay@g.com'}
                profile_photo={''}
            />
            <div className="h-fit min-h-screen bg-ak-dark-blue">
                <WelcomeTemplate first_name={'Vijay'} bannerStyles={"text-white"}>
                    <RegistryMemberships>
                        {
                            registeries.map((registry) => {
                                return (
                                    <RegistrySelectRow
                                        logo={AkelloLogo}
                                        name={registry['name']}
                                        members={registry['members']}
                                        patients={registry['patients']}
                                        onClick={() => console.log('click')}
                                    />
                                )
                            })
                        }
                    </RegistryMemberships>
                </WelcomeTemplate>
            </div>
        </>
    )
}

export default HomePage