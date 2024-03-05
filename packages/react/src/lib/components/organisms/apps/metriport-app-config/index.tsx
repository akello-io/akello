import { Card, Group, Switch, Text, Input, Button, Space } from '@mantine/core';
import classes from './metriport-app-config.module.css';
import { AkelloApp } from '@akello/core';

export interface MetriportAppConfigProps {  
  app: AkelloApp 
  setApp: (app: AkelloApp) => void;
  onClick?: () => void;
}

export const AppConfig:React.FC<MetriportAppConfigProps> = ({app, setApp, onClick}) => {

  return (    
    <Card withBorder radius="md" p="xl" className={classes.card}>            
      <div className='space-y-3'>
        <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl">
            <div>
                <Text>sss</Text>        
            </div>
            <Input value={app.configs["API URL"]} w={500}  onChange={(event) => {
                const newApp = {...app}
                newApp.configs["API URL"] = event.target.value
                setApp(newApp)
            }}/>            
        </Group>

      </div>      
      <Space h="xl" />
      <Button onClick={onClick} fullWidth>Save</Button>
    </Card>
  );
}