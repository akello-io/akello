import { AppConfig } from '@akello/react'
import { useAkello } from '@akello/react-hook'
import {useState, useEffect} from 'react'

const AkelloAppSettingsPage = () => {    
    const akello = useAkello()
    const [app, setApp] = useState({})
    const selectedRegistry = akello.getSelectedRegistry()

    useEffect(() => {
        akello.registryService.getAppConfigs(selectedRegistry!.id, (data: any) => {            
            const selectedApp = window.location.pathname.split('/').pop()
            for (const app of data['apps']) {
                if (app['id'] === selectedApp) {
                    setApp(app)
                }
            }            
        })
    }, [])

    const configs = app['configs']

    return (
        <div>
        <h1>Akello App Settings</h1>
        
        {configs && <AppConfig configs={configs} />}        
        </div>
    );
}

export default AkelloAppSettingsPage;
