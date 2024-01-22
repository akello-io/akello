import {WelcomeTemplate, RegistryMemberships, RegistrySelectRow, TopNavigation} from '@akello/react'
import {AkelloAPIService} from "@akello/core"
import AkelloLogo from '../../../images/logos/akello/akello-logo.png'
import AkelloLogoCorner from '../../../images/logos/akello/akello-corner-logo.svg'
import {RootState} from "../../../store"
import {useNavigate} from "react-router";
import {Auth} from "aws-amplify";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


const RegistrySelectionPage = () => {

    const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.app.token)
    const [create, setCreate] = useState(false)
    const [registries, setRegistries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(token) {
            setIsLoading(true)
            const api_service = new AkelloAPIService(process.env.REACT_APP_API!, token!)
            api_service.getUserRegistries((data: any) => {
                setRegistries(data)
            }, (error: any) => {
                setIsLoading(false)
            })

        }
    }, [token])


    return (
        <div className={'w-screen h-auto bg-base-200/40'}>
            <TopNavigation
                signIn={()=> {}}
                logo={<img src={AkelloLogo} alt={'Akello Logo'} className={'h-8'}/>}
                signOut={()=>{Auth.signOut()}}
                createRegistry={()=> {navigate('/registry/create')}}
                signed_in={true}
                menu_items={[]}
                theme_swapper={true}
                />
            <WelcomeTemplate first_name={'Vijay'}>

                <RegistryMemberships onCreate={()=> {
                    navigate('/registry/create')
                }}>
                    {
                        registries.map((registry) => {
                            return (
                                <>
                                    <RegistrySelectRow
                                        logo={AkelloLogoCorner}
                                        registry_id={registry['id']}
                                        name={registry['name']}
                                        members={registry['members']}
                                        patients={registry['active_patients']}
                                        onClick={() => {navigate('/registry')}}
                                    />
                                </>
                            )
                        })
                    }
                </RegistryMemberships>
            </WelcomeTemplate>
        </div>
    )
}

export default RegistrySelectionPage