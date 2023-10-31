
import AkelloLog from "../../images/logos/akello/akello-corner-logo.svg"
import AkelloLogWhite from "../../images/logos/akello/akello-white-logo.png"
import {useEffect, useState} from "react";
import {getUserRegistries} from "../../api/user";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useNavigate} from "react-router";
import {setSelectedRegistry} from "../../reducers/appSlice";
import TopNavigation from "../../stories/app/Navigation/TopNavigation/TopNavigation";




interface RegistryProps {
    id: string
    name: string
    members: number
    patients: number
    description: string
}

const Registry:React.FC<RegistryProps> = ({id, name, members, patients, description}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            <div className={"flex flex-row w-full justify-between bg-white py-8 px-12"} onClick={() => {
                dispatch(setSelectedRegistry({
                    id: id,
                    name: name
                }))
                localStorage.setItem("selectedRegistry",  JSON.stringify({id: id, name: name}))
                navigate('/registry')
            }}>
                <div className={" flex flex-row space-x-4"}>
                    <div>
                        <img src={AkelloLog} className={"w-28 h-auto rounded-lg cursor-pointer"}/>
                    </div>
                    <div className={"flex flex-col space-y-4"}>
                        <div className={"font-medium text-3xl"}>
                            {name}
                        </div>
                        <div>
                            {members} members | {patients} active patients
                        </div>
                    </div>

                </div>

                <div className={"my-auto"}>
                    <button className={"btn bg-ak-yellow  rounded-lg text-xl"}>
                        LAUNCH
                    </button>

                </div>

            </div>
        </>
    )
}


const Section = () => {
    const token = useSelector((state: RootState) => state.app.token)
    const navigate = useNavigate()
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


    return (
        <>
            <div className={"w-full  h-auto "}>
                <div className={"rounded-t-xl flex justify-between bg-ak-light-blue w-full px-12 py-4 text-white"}>

                    <div className={"flex flex-row space-x-4 text-2xl my-auto"}>
                        {
                            isLoading && (
                                <>

                                    <span className="loading bg-white loading-ring loading-lg"></span>
                                </>
                            )
                        }
                        <div>
                            Registries you are part of
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-1 divide-y rounded-b-xl "}>

                    {
                        !isLoading && registries.map((registry) => {
                            return (
                                <Registry id={registry['id']} name={registry['name']} members={registry['members']} patients={registry['active_patients']} description={''} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

interface RegistrySelectorProps {
    signOut: (data?: any | undefined) => void
}

const RegistrySelector:React.FC<RegistrySelectorProps> = ({signOut}) => {

    const navigate = useNavigate()
    const userProfile = useSelector((state: RootState) => state.app.userProfile)

    useEffect(() => {
        localStorage.setItem("selectedRegistry",  "")
    })


    return (
        <>
            <div className="h-fit min-h-screen bg-ak-dark-blue  ">
                <TopNavigation logo={AkelloLogWhite} profile_photo={userProfile.profile_photo} email={userProfile.email} primary_button={
                    (
                        <>

                            <div className={"flex flex-row space-x-4"}>
                                {/*
                                    <button className={"btn btn-neutral text-xs"} >TALK TO SALES</button>
                                */}
                                <button className={"btn text-xs"} onClick={() => navigate('/registry/create')} >CREATE A NEW REGISTRY</button>
                            </div>

                        </>


                    )} signOut={signOut}
                />
                <div className="p-4  mx-auto  max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:px-8 lg:py-20 space-y-12">
                    <div className={"text-4xl text-white font-black"}>
                        🌈 Welcome back, {userProfile.first_name}
                    </div>
                    <Section />
                </div>
            </div>
        </>
    )
}

export default RegistrySelector