import { Card, Avatar, Text, Group, Button } from '@mantine/core';
import classes from './UserInfoCard.module.css';
import { useAkello } from "@akello/react-hook";

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
];

const UserInfoCard = () => {
  const akello = useAkello();

  
  const given_name = localStorage.getItem('given_name');
  const family_name = localStorage.getItem('family_name');

  return (
    <Card withBorder radius="md" >            
            <Avatar        
                size={80}
                radius={80}
                mx="auto"
                mt={10}        
                className={classes.avatar}
            >
                {given_name?.charAt(0)}{family_name?.charAt(0)}
            </Avatar>
            <Text ta="center" fz="lg" fw={500} mt="sm" >
              {given_name} {family_name}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                Care Manager
            </Text>            
            <Button fullWidth onClick={() => akello.logout()} radius="md" mt="xl" size="md" variant="default">
                Sign Out
            </Button>
    </Card>
    
  );
}

export default UserInfoCard