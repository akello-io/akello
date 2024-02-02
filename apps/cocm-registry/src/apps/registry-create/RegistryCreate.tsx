import AppContainer from "../../stories/app/Container/AppContainer";
import {SideNavigation, Dropdown} from "@akello/react";
import {ReactNode, useState} from "react";
import {useNavigate} from "react-router";
import {createRegistry} from "../../api/registry";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import { setIn } from "formik";



interface UserInvite {
    email: string
    role: string
    is_admin: boolean
}

interface APIIntegration {
    name: string
    api_key: string
}

interface RegistryCreateSectionProps {
    step: number
    total_steps: number
    title: string
    description: string
    setIdx: (idx: number) => void
    inputs: ReactNode
    registryName?: string
    invites?: UserInvite[]
    integrations?: APIIntegration[]
    logo_url?: string
}

const RegistryCreateSection:React.FC<RegistryCreateSectionProps> = (
    {
        step,
        total_steps,
        title,
        description,
        setIdx,
        inputs,
        registryName,
        invites,
        integrations,
        logo_url
    }
) => {

    const navigate = useNavigate()
    const token = useSelector ((state: RootState) => state.app.token)
    const userProfile = useSelector ((state: RootState) => state.app.userProfile)

    return (
        <>
            <div className={"p-24"}>
                <div className={"text-xl"}>
                    Step {step} of {total_steps}
                </div>
                <div>
                    <div className={"font-black text-6xl"}>
                        {title}
                    </div>

                    <div className={"pt-12"}>
                        {description}
                    </div>

                    <div className={"pt-4"}>
                        {inputs}
                    </div>

                    <div className={"pt-4 space-x-4"}>
                        {
                            step > 1 && (
                                <button className={"btn btn-primary"} onClick={()=> setIdx( 0)}>Back</button>
                            )
                        }
                        {
                            step < total_steps && (
                                <button className={"btn btn-primary"} onClick={()=> setIdx(step)}>Next</button>
                            )
                        }
                        {
                            step == total_steps && (
                                <button disabled={registryName == undefined || registryName == '' }  className={"btn btn-primary"} onClick={()=> {                                    
                                    createRegistry(token, {
                                        'name': registryName!,
                                        'invited-users': invites,
                                        'first_name': userProfile.first_name ? userProfile.first_name : '',
                                        'last_name': userProfile.last_name ? userProfile.last_name : '',
                                        'email': userProfile.email,
                                        'integrations': integrations,
                                        'logo_url': logo_url
                                    }, (data) => {
                                        navigate("/registry")
                                    })
                                }}>Create Registry</button>
                            )
                        }
                    </div>

                </div>
            </div>
        </>
    )
}


const RegistryCreate = () => {

    const [invites, setInvites] = useState<UserInvite[]>([])
    const [stepIdx, setStepIdx] = useState(0)
    const [screeners, setScreeners] = useState([])
    const [registryName, setRegistryName] = useState('')
    const [integrations, setIntegrations] = useState<APIIntegration[]>([])
    const [logoUrl, setLogoUrl] = useState('')

    const create_steps = [
        {   step: 1,
            title: "What's the name of your registry?",
            description: "This will be the name of your Akello registry - Chose something that your team will recognize",
            inputs: (
                <>
                    <div className="flex flex-col space-y-4">
                        <input
                            id={"registry-name"}
                            type="text"
                            placeholder="Registry name"
                            className="input input-bordered w-full max-w-xs"
                            value={registryName}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                setRegistryName(e.currentTarget.value)
                            }}
                        />
                        {/* 
                        <input
                            id={"logo-url"}
                            type="text"
                            placeholder="Logo URL"
                            className="input input-bordered w-full max-w-xs"
                            value={logoUrl}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                setLogoUrl(e.currentTarget.value)
                            }}
                        />
                        */}
                    </div>
                </>
            )
        },        
        /* 
        {
            step: 2,
            title: "Invite your team members",
            description: "Make sure to only add team members that are authorized to view your patient population",
            inputs: (
                <div className={"space-y-4"}>

                    <div className={"grid grid-cols-3 gap-4"}>
                        <div>Email</div>
                        <div>Role</div>
                        <div></div>

                        {
                            invites.map((invite, idx) => {
                                return (
                                    <>
                                        <input type="text" placeholder="Team Member Email" className="input input-bordered w-full max-w-xs"
                                               value={invites[idx].email}
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                let copy = [...invites]
                                                copy[idx].email = e.currentTarget.value
                                                setInvites(copy)
                                            }}
                                        />
                                        <Dropdown placeholder={"Select Role"} options={[
                                            {id: '1', value: 'Care Manager'},
                                            {id: '2', value: 'Physician'},
                                            {id: '3', value: 'Consulting Psychiatrist'}
                                        ]} setSelectedOption={(role) => {

                                            let copy = [...invites]
                                            copy[idx].role = role

                                            setInvites(copy)
                                        }} />
                                        <div className={"cursor-pointer"} onClick={() => {
                                            let copy = [...invites].filter((invite, filterIdx) => {
                                                return idx != filterIdx
                                            })
                                            setInvites(copy)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </>
                                )
                            })
                        }
                        <div></div>
                        <div></div>
                        <div></div>
                        <div className={"btn btn-secondary cursor-pointer py-2 w-32"} onClick={() => {
                            setInvites([...invites, {email: '', role: '', is_admin: false}])
                        }}>
                            Add User
                        </div>
                    </div>

                </div>
            )
        },
        */
    ]

    return (
        <>
            <SideNavigation
                logo={<a href={"/"}><img src={"/akello-logo.png"} alt="Akello Health" /></a>}
                selectedBtn={{name: "Registry", short_name: "Registry", icon: <>{}</>, is_active: true, navigate: () => {}}}
                top_navigation={[]}
                bottom_navigation={[]}
            />
            <main className="pl-20 pt-4  h-full">
                <RegistryCreateSection
                    step={create_steps[stepIdx].step}
                    total_steps={create_steps.length}
                    title={create_steps[stepIdx].title}
                    description={create_steps[stepIdx].description}
                    setIdx={(idx) => setStepIdx(idx)}
                    inputs={create_steps[stepIdx].inputs}
                    registryName={registryName}
                    invites={invites}
                    integrations={integrations}
                    logo_url={logoUrl}
                />

            </main>
        </>
    )
}

export default RegistryCreate