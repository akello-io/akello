import { AppConfig, FhirQueryScore } from '@akello/react'
import { AkelloApp } from '@akello/core'
import { Breadcrumbs, Anchor } from '@mantine/core';
import { useAkello } from '@akello/react-hook'
import {useState, useEffect} from 'react'



const AkelloAppSettingsPage = () => {    
    const akello = useAkello()
    const [app, setApp] = useState<AkelloApp | null>(null)

    const selectedRegistry = akello.getSelectedRegistry()

    const items = [
        { title: 'Akello Apps', href: '#' },
        { title: app?.name, href: '#' }    
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));
    

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
    console.log('app')
    console.log(app)

    const SelectedAppConfig = {
        'akello-app-config': (<AppConfig app={app} onClick={(appData) => {              
            akello.registryService.saveAkelloApp(selectedRegistry!.id, appData, () => {                
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
            <Breadcrumbs>{items}</Breadcrumbs>
            <p className='font-semibold text-2xl'>{app?.name} Settings</p>                        
            {(SelectedAppConfig[app.react_component]) ? SelectedAppConfig[app.react_component] : <div>Not implemented yet</div>}
        </div>
    );
}

export default AkelloAppSettingsPage;
