import { AppConfig, FhirQueryScore } from '@akello/react'
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

    if(!app) { 
        return <div>Loading...</div>
    }

    const SelectedAppConfig = {
        'akello-app-config': (<AppConfig app={app} setApp={setApp} onClick={() => {            
            akello.registryService.saveAkelloApp(selectedRegistry!.id, app, () => {
                console.log('saved')
            }) 
        }} />),
        'fhir-query-score': (<FhirQueryScore scoreName='Metriport FHIR Query Score' onSubmit={(data) => {
            console.log(data)
            app.configs = [
                {
                    type: 'fhir-query-score',
                    key: 'fhir-query-score',
                    value: data
                }
            ]

            akello.registryService.saveAkelloApp(selectedRegistry!.id, app, () => {
                console.log('saved')
            }) 
        }}/>)
    } as any;


    return (
        <div className='space-y-4'>
            <p className='font-semibold text-2xl'>{app?.name} Settings</p>                        
            {(SelectedAppConfig[app.react_component]) ? SelectedAppConfig[app.react_component] : <div>Not implemented yet</div>}
        </div>
    );
}

export default AkelloAppSettingsPage;
