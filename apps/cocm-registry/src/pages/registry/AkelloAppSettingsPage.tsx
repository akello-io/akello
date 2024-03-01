import { AppConfig } from '@akello/react'
import { AkelloApp } from '@akello/core'
import { useAkello } from '@akello/react-hook'
import {useState, useEffect} from 'react'

const AkelloAppSettingsPage = () => {    
    const akello = useAkello()
    const [app, setApp] = useState<AkelloApp | null>(null)

    const selectedRegistry = akello.getSelectedRegistry()

    useEffect(() => {
        akello.registryService.getAppConfigs(selectedRegistry!.id, (data: AkelloApp[]) => {            
            const selectedApp = window.location.pathname.split('/').pop()            
            for (const app of data) {
                if (app.id === selectedApp) {
                    setApp(app)
                }
            }            
        })
    }, [])


    return (
        <div>
        <h1>Akello App Settings</h1>
        
        {app?.configs && <AppConfig app={app} setApp={setApp} onClick={() => {
            console.log('clicked')       
            akello.registryService.saveAkelloApp(selectedRegistry!.id, app, () => {
                console.log('saved')
            }) 
        }} />}        
        </div>
    );
}

export default AkelloAppSettingsPage;
