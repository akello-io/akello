
import {useEffect, useState} from "react";
import {getUserRegistries} from "../../api/user";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useNavigate} from "react-router";
import {setSelectedRegistry} from "../../reducers/appSlice";
import {RegistrySelectRow, TopNavigation, WelcomeBanner, ThemeSwap} from "@akello/react"
import {RegistryMemberships} from "@akello/react"


interface RegistrySelectorProps {
    signOut: (data?: any | undefined) => void
}

const RegistrySelector:React.FC<RegistrySelectorProps> = ({signOut}) => {

    const navigate = useNavigate()
    const userProfile = useSelector((state: RootState) => state.app.userProfile)

    const token = useSelector((state: RootState) => state.app.token)
    
    const dispatch = useDispatch()
    const [create, setCreate] = useState(false)
    const [registries, setRegistries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(token) {
            setIsLoading(true)
            getUserRegistries(token, (data) => {
                setRegistries(data)
                setIsLoading(false)
            })
        }

    }, [token])


    useEffect(() => {
        localStorage.setItem("selectedRegistry",  "")
    })


    return (
        <>
            <div className="h-fit min-h-screen  ">
                <TopNavigation
                    signIn={() => navigate('/login')}
                    signOut={signOut}
                    signed_in={true}
                    logo={<></>}
                    createRegistry={ () => navigate('/registry/create')}
                    menu_items={[]}
                    theme_swapper={
                        <>
                            <ThemeSwap  />
                        </>
                    }
                />

                <div className="p-4  mx-auto  max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:px-8 lg:py-20 space-y-12">
                    <WelcomeBanner first_name={userProfile.first_name} />                    
                    <RegistryMemberships onCreate={() => navigate('/registry/create')}>
                        {
                            !isLoading && registries.map((registry) => {
                                return (
                                    <>
                                    <RegistrySelectRow 
                                        id={"registry['id']"} 
                                        onClick={() => {
                                            localStorage.setItem("selectedRegistry",  JSON.stringify({id: registry['id'], name: registry['name']}))
                                            dispatch(setSelectedRegistry({
                                                id: registry['id'],
                                                name: registry['name']
                                            }))
                                            navigate('/registry')
                                        }}
                                        name={registry['name']}
                                        members={registry['members']}
                                        logo_url={''}
                                        patients={3}
                                        screeners={3}
                                    />
                                    
                                    </>
                                    
                                )
                            })
                        }
                    </RegistryMemberships>    
                </div>
            </div>
        </>
    )
}

export default RegistrySelector