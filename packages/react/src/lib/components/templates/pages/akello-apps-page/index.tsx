import {AkelloAppCard} from '../../../molecules/core/akello-app-card'
import { AkelloApp } from '@akello/core'
import { useAkello } from '@akello/react-hook'
import {useState, useEffect} from 'react'




export const AkelloAppsPage = () => {
    const [apps, setApps] = useState<AkelloApp[]>([])
    const akello = useAkello()

    const selectedRegistry = akello.getSelectedRegistry();

    useEffect(() => {
        akello.registryService.getAppConfigs(selectedRegistry!.id, (data: AkelloApp[]) => {
            setApps(data)
        })
    }, [])


    return (
        <>
            <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    {apps.map(app => (
                        <AkelloAppCard
                            akello_app={app}
                            onClick={() => {

                            }}
                        />
                    ))}
                </div>
            </div>


        </>
    )
}