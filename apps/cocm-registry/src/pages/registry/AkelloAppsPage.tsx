import {AkelloAppCard} from '@akello/react'
import { useNavigate } from 'react-router-dom'
import { useAkello } from '@akello/react-hook'
import {useState, useEffect} from 'react'




const AkelloAppsPage = () => {

    const [appGroups, setAppGroups] = useState<{}>([])
    const [apps, setApps] = useState([])

    const navigate = useNavigate();
    const akello = useAkello()    
    
    const selectedRegistry = akello.getSelectedRegistry();    

    useEffect(() => {
        akello.registryService.getAppConfigs(selectedRegistry!.id, (data: any) => {
            setAppGroups(data['app-groups'])        
            setApps(data['apps'])
        })
    }, [])
    

    

    return (
        <>            
            {apps.map(app => (
                <AkelloAppCard 
                    id={app['id']} 
                    logo={app['logo']} 
                    title={app['name']} 
                    description={app['description']} 
                    active={app['status'] === 'active'}
                    onClick={() => {                        
                        navigate('/registry/' + akello.getSelectedRegistry()?.id + '/apps/' + app['id'])
                    }}
                />
            ))}            
        </>
    )
}

export default AkelloAppsPage