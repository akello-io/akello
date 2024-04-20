import { Card, Avatar, Text, Center, Button, FileButton, Image} from '@mantine/core';
import { useAkello } from "@akello/react-hook";
import { useState } from 'react';
import { ThemeToggle } from '../theme-toggle'



interface UserInfoCardProps {
  signOut: () => void;
}

export const UserInfoCard:React.FC<UserInfoCardProps> = ({signOut}) => {

  const akello = useAkello();
  const userProfileInfo = akello.getProfileInfo();

  const [file, setFile] = useState(localStorage.getItem('profile-photo'));
  const given_name = localStorage.getItem('given_name');
  const family_name = localStorage.getItem('family_name');
  const photo  = userProfileInfo?.photo;


  const getBase64 = (file: any) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }

  return (
    <Card withBorder radius="md" >
            <Avatar
                className='my-auto mx-auto'
                size={80}
                radius={80}
                color="cyan">
            {
              photo ? <Image src={photo} alt="profile photo" radius="xl" /> : given_name?.charAt(0)!+family_name?.charAt(0)
            }
            </Avatar>


            <Text ta="center" fz="lg" fw={500} mt="sm" >
              {given_name} {family_name}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                Care Manager
            </Text>
            <Center pt={15}>
              <ThemeToggle />
            </Center>

            <Button fullWidth onClick={() => {
              akello.selectOrganization(undefined)
              akello.dispatchEvent({ type: 'change' });
            }} radius="md" mt="xl" size="md" variant="default">
                Dashboard
            </Button>

            <Button fullWidth onClick={() => {
              akello.logout()
              signOut()
            }} radius="md" mt="xl" size="md" variant="default">
                Sign Out
            </Button>
    </Card>

  );
}