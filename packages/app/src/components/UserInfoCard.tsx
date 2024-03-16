import { Card, Avatar, Text, Group, Button, FileButton } from '@mantine/core';
import { useAkello } from "@akello/react-hook";
import { useState } from 'react';



const UserInfoCard = () => {
  const akello = useAkello();  
  const [file, setFile] = useState(localStorage.getItem('profile-photo'));


  const given_name = localStorage.getItem('given_name');
  const family_name = localStorage.getItem('family_name');

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
            <FileButton  onChange={(file: any) => {              
              setFile(file);       

              getBase64(file).then(base64 => {
                localStorage["profile-photo"] = base64;
                console.debug("file stored",base64);
              });

              akello.userService.updateProfilePhoto(file, (data: any) => {
                console.log(data);              
              });
            }}
            accept="image/png,image/jpeg">
              {(props) => (              
                  <Avatar                      
                    className='cursor-pointer hover:opacity-75 transition-opacity duration-300 ease-in-out'  
                    size={80}
                    radius={80}
                    src={file}
                    mx="auto"
                    mt={10}                            
                    {...props}
                >
                  {given_name?.charAt(0)}{family_name?.charAt(0)}  
                </Avatar>               
            )}
            </FileButton>
            
            
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