import { Card, Group, Switch, Text, Input, Button } from '@mantine/core';
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
      description: 'none'
    }
  })

  const items = data.map((item: any, idx) => (
    <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl" key={item.title}>
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" c="dimmed">
          {item.description}
        </Text>
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
      <Text fz="lg" className={classes.title} fw={500}>
        Configure Integration
      </Text>
      <Text fz="xs" c="dimmed" mt={3} mb="xl">
        Configure.....
      </Text>
      {items}
      <Button onClick={onClick} fullWidth>Save</Button>
    </Card>
  );
}