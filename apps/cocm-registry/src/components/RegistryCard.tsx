import { Card, Avatar, Text, Progress, Badge, Group, ActionIcon } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAkello } from "@akello/react-hook";
import { Registry } from '@akello/core';
import AkelloLog from '../assets/Logo/PNGs/D2-AH-CBBP-Logo-V3-240323-AS_icon-akello-blue.png';

interface RegistryCardProps {
  registry: Registry;  
  avatars: string[];
}

const RegistryCard: React.FC<RegistryCardProps> = (props) => {
  const navigate = useNavigate();
  const akello = useAkello();

  return (
    <Card withBorder padding="lg" radius="md">
      <Group justify="space-between">
        <Avatar src={AkelloLog} radius="xl" />
        <div className='flex flex-row space-x-3'>
          <Badge>Badge</Badge>      
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
          
        </Text>
      </Text>

      <Progress value={.3 * 100} mt={5} />

      <Group justify="space-between" mt="md">
        <Avatar.Group spacing="sm">
          {props.avatars.map((avatar, index) => {
            return <Avatar src={avatar} radius="xl" key={index} />;
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