import { Card, Group, Switch, Text, Input, Button, Space } from '@mantine/core';
import classes from './app_config.module.css';
import { AkelloApp, AkelloAppConfig } from '@akello/core';



export interface AppConfigProps {  
  app: AkelloApp 
  setApp: (app: AkelloApp) => void;
  onClick?: () => void;
}

export const AppConfig:React.FC<AppConfigProps> = ({app, setApp, onClick}) => {

  const data = app.configs.map((config: AkelloAppConfig) => { 
    return {
      title: config.key,      
    }
  })

  const items = data.map((item: any, idx) => (
    <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl" key={item.title}>
      <div>
        <Text>{item.title}</Text>        
      </div>
      <Input value={app.configs[idx].value} w={500}  onChange={(event) => {
        const newApp = {...app}
        newApp.configs[idx].value = event.target.value
        setApp(newApp)
      }}/>            
    </Group>
  ));

  return (    
    <Card withBorder radius="md" p="xl" className={classes.card}>            
      <div className='space-y-3'>
        {items}
      </div>      
      <Space h="xl" />
      <Button onClick={onClick} fullWidth>Save</Button>
    </Card>
  );
}