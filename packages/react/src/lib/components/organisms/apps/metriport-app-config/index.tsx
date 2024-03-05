import { Card, Group, Switch, Text, Input, Button, Space } from '@mantine/core';
import classes from './metriport-app-config.module.css';
import { AkelloApp } from '@akello/core';

export interface MetriportAppConfigProps {  
  app: AkelloApp   
  onClick?: (app: AkelloApp) => void;
}

export const AppConfig:React.FC<MetriportAppConfigProps> = ({app, onClick}) => {

  return (    
    <Card withBorder radius="md" p="xl" className={classes.card}>            
      <div className='space-y-3'>
        <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl">
            <div>
                <Text>API URL</Text>        
            </div>
            <Input value={app.configs["API URL"]} w={500}  onChange={(event) => {                                
                app.configs["API URL"] = event.target.value                
            }}/>            
        </Group>
        <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl">
            <div>
                <Text>Secret Key</Text>        
            </div>
            <Input value={app.configs["Secret Key"]} w={500}  onChange={(event) => {                
                app.configs["Secret Key"] = event.target.value                
            }}/>            
        </Group>

      </div>      
      <Space h="xl" />
      <Button onClick={() => {                  
            if (onClick) {
                onClick(app)
            }
        }} fullWidth>Save</Button>
    </Card>
  );
}