import { Menu, UnstyledButton, Text, rem } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import ThemeToggle from './ThemeToggle';
import { useAkello } from "@akello/react-hook";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mantine/core';


const HeaderMenu = () => {
  const akello = useAkello();
  const navigate = useNavigate();

  return (
    <Menu shadow="md" width={200}>      
      <Menu.Target>        
        <UnstyledButton className='flex flex-row space-x-2'>
          <Avatar className='my-auto' color="cyan" radius="xl">VS</Avatar>
          <div className='my-auto'>
            Vijay Selvaraj
          </div>          
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
            <div className='flex flex-row justify-between'>
                <div>
                    Account
                </div>    
                <ThemeToggle />
            </div>            
        </Menu.Label>
        <Menu.Item
          leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => {akello.logout()}}
        >
          Sign Out
        </Menu.Item>       
       

         
      </Menu.Dropdown>
    </Menu>
  );
}

export default HeaderMenu