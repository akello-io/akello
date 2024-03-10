import {AkelloAppCard} from '@akello/react'
import { useNavigate } from 'react-router-dom'
import { AkelloApp } from '@akello/core'
import { useAkello } from '@akello/react-hook'
import {useState, useEffect} from 'react'




const AkelloAppsPage = () => {    
    const [apps, setApps] = useState<AkelloApp[]>([])
    const navigate = useNavigate();
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
                                navigate('/registry/' + akello.getSelectedRegistry()?.id + '/apps/' + app['id'])
                            }}
                        />
                    ))}            
                </div>              
            </div>
            
            
        </>
    )
}

export default AkelloAppsPage