import {Dropdown} from "@akello/react";
import {ReactNode, useState} from "react";
import {useNavigate} from "react-router";
import { useAkello } from "@akello/react-hook";
import {Registry} from "@akello/core";
import {    
    Button 
  } from '@mantine/core';

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
    registryDescription?: string 
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
        registryDescription,
        invites,
        integrations,
        logo_url
    }
) => {

    const navigate = useNavigate()
    const akello = useAkello()
    return (
        <>
            <div className={"p-24"}>
                {/* 
                <div className={"text-xl"}>
                    Step {step} of {total_steps}
                </div>
                */}
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
                                <Button disabled={registryName == undefined || registryName == '' }  className={" bg-primary"} onClick={()=> {                                    

                                    akello.registryService.createRegistry({
                                        'name': registryName!,
                                        'description': registryDescription!,
                                        'invited-users': invites,
                                        'first_name': 'Vijay',
                                        'last_name': 'Selvaraj',
                                        'email': 'vijay.selvaraj@gmail.com',
                                        'integrations': integrations,
                                        'logo_url': logo_url
                                    }, (data) => {                                        
                                        const registry = new Registry(data['id'], data['name'], [], [], {})
                                        akello.selectRegistry(registry)
                                        navigate("/registry/" + data['id'])
                                    })
                                }}>Create Registry</Button>
                            )
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

const CreateRegistryPage = () => {
    const [invites, setInvites] = useState<UserInvite[]>([])
    const [stepIdx, setStepIdx] = useState(0)
    const [screeners, setScreeners] = useState([])
    const [registryName, setRegistryName] = useState('')
    const [registryDescription, setRegistryDescription] = useState('')
    const [integrations, setIntegrations] = useState<APIIntegration[]>([])
    const [logoUrl, setLogoUrl] = useState('')

    const create_steps = [
        {   step: 1,
            title: "What's the name of your registry?",
            description: "This will be the name of your Akello registry - Chose something that your team will recognize",
            inputs: (
                <>
                    <div>
                        <div className="flex flex-col space-y-4">
                            <input
                                id={"registry-name"}
                                type="text"
                                placeholder="Registry name"
                                className="input input-bordered bg-white w-full max-w-xs"
                                value={registryName}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setRegistryName(e.currentTarget.value)
                                }}
                            />                        
                        </div>
                        <div className="flex flex-col space-y-4">
                            <input
                                id={"registry-description"}
                                type="text"
                                placeholder="Description"
                                className="input input-bordered bg-white w-full max-w-xs"
                                value={registryDescription}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setRegistryDescription(e.currentTarget.value)
                                }}
                            />                        
                        </div>
                    </div>
                    
                </>
            )
        }        
    ]

    return (
        <>            
            <main className="pl-20 pt-4  h-full">
                <RegistryCreateSection
                    step={create_steps[stepIdx].step}
                    total_steps={create_steps.length}
                    title={create_steps[stepIdx].title}
                    description={create_steps[stepIdx].description}
                    setIdx={(idx) => setStepIdx(idx)}
                    inputs={create_steps[stepIdx].inputs}
                    registryName={registryName}
                    registryDescription={registryDescription}
                    invites={invites}
                    integrations={integrations}
                    logo_url={logoUrl}
                />

            </main>
        </>
    )
}

export default CreateRegistryPage

