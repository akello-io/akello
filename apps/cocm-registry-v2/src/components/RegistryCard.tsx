import { Card, Avatar, Text, Progress, Badge, Group, ActionIcon } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { IconUpload } from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom'
import {useAkello} from "@akello/react-hook"
import AkelloLog from '../assets/Logo/PNGs/D2-AH-CBBP-Logo-V3-240323-AS_icon-akello-blue.png'

interface RegistryCardProps {
    id: string;
    name: string;
    description: string;
    totalPatients: number;
    avgTreatmentDuration: number; // weeks
    needsDiscussion: number;
    safetyRisk: number;
    minutesTracked: number;    
    totalMinutes: number;
    avatars: string[]; 
}

const RegistryCard:React.FC<RegistryCardProps> = (props) => {
    const navigate = useNavigate()
    const akello = useAkello()

  return (
    <Card withBorder padding="lg" radius="md">
      <Group justify="space-between">
        <Avatar src={AkelloLog} radius="xl" />
        <div className='flex flex-row space-x-3'>
          {props.safetyRisk > 0 && (<><Badge>Safety Risk</Badge></>)}        
          {props.needsDiscussion > 0 && (<><Badge>Needs Discussion</Badge></>)}        
        </div>
        
      </Group>

      <Text fz="lg" fw={500} mt="md">
        {props.name}
      </Text>
      <Text fz="sm" c="dimmed" mt={5}>
        {props.description}
      </Text>

      <Text c="dimmed" fz="sm" mt="md">
        Tasks completed:{' '}
        <Text span fw={500} c="bright">
          {props.minutesTracked}/{props.totalMinutes}
        </Text>
      </Text>

      <Progress value={(props.minutesTracked / props.totalMinutes) * 100} mt={5} />

      <Group justify="space-between" mt="md">
        <Avatar.Group spacing="sm">
            {props.avatars.map((avatar, index) => {
                return <Avatar src={avatar} radius="xl" />
             })}          
        </Avatar.Group>
        <ActionIcon variant="default" size="lg" radius="md" onClick={()=> {
            navigate('/registry/' + props.id)
            akello.selectRegistry(props.id)
        }}>
          <IconUpload size="1.1rem" />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export default RegistryCard;