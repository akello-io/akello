import { Card, Avatar, Text, Progress, Badge, Group, ActionIcon } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAkello } from "@akello/react-hook";
import { Registry } from '@akello/core';
import AkelloLog from '../assets/Logo/PNGs/D2-AH-CBBP-Logo-V3-240323-AS_icon-akello-blue.png';

interface RegistryCardProps {
  registry: Registry;  
}

const RegistryCard: React.FC<RegistryCardProps> = (props) => {
  const navigate = useNavigate();
  const akello = useAkello();
      
  debugger;
  return (    
    <Card className='cursor-pointer' withBorder padding="lg" radius="md" onClick={() => {
      navigate('/registry/' + props.registry.id);
      akello.selectRegistry(props.registry);
    }}>
      <Group justify="space-between">
        <Avatar src={AkelloLog} radius="xl" />
        <div></div>        
        <div className='flex flex-row space-x-3'>
          {
            props.registry.stats['safety_risk'] && <Badge color='red'>Safety Risk</Badge>      
          }
          
        </div>        
      </Group>

      <Text fz="lg" fw={500} mt="md">
        {props.registry.name}
      </Text>
      
      <Text fz="sm" c="dimmed" mt={5}>
      {props.registry.name}
      </Text>      

      
      <Text c="dimmed" fz="sm" mt="md">
        Minutes completed this month:{' '}
        <Text span fw={500} c="bright">
          {props.registry.stats.completed_minutes}
        </Text>
      </Text>
      <Progress value={props.registry.stats.completed_minutes/props.registry.stats.total_minutes * 100} mt={5} />
    
      
      <Group justify="space-between" mt="md">

        <Avatar.Group spacing="sm">
          {props.registry.members.map((member, index) => {                
            return <Avatar color="red"  radius="xl" key={index}>{member.first_name[0]}{member.last_name[0]}</Avatar>;
          })}
        </Avatar.Group>
              
        <ActionIcon variant="default" size="lg" radius="md" onClick={() => {
          navigate('/registry/' + props.registry.id);
          akello.selectRegistry(props.registry);
        }}>
          <IconUpload size="1.1rem" />
        </ActionIcon>
      </Group>
      
    </Card>
  );
};

export default RegistryCard;