import {AkelloAppCard} from '@akello/react'
import { useNavigate } from 'react-router-dom'
import { useAkello } from '@akello/react-hook'

const AkelloAppsPage = () => {

    const navigate = useNavigate();
    const akello = useAkello()    


    const apps = [
        {
            id: "metriport",
            logo: "https://mintlify.s3-us-west-1.amazonaws.com/metriport/logo/light.png",
            title: "Metriport",
            description: "description",
            active: true            
        }
    ]

    return (
        <>
            {apps.map(app => (
                <AkelloAppCard 
                    id={app.id} 
                    logo={app.logo} 
                    title={app.title} 
                    description={app.description} 
                    active={app.active}
                    onClick={() => {                        
                        navigate('/registry/' + akello.getSelectedRegistry()?.id + '/apps/' + app.id)
                    }}
                />
            ))}            
        </>
    )
}

export default AkelloAppsPage