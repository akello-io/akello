import { Menu, UnstyledButton, Avatar, Image} from '@mantine/core';
import { useState } from 'react';
import UserInfoCard from './UserInfoCard';

const HeaderMenu = () => {
  const [file, _] = useState(localStorage.getItem('profile-photo'));

  const given_name = localStorage.getItem('given_name');
  const family_name = localStorage.getItem('family_name');
  
  return (
    <Menu shadow="md" width={300}>
      <Menu.Target>
        <UnstyledButton className='flex flex-row space-x-2'>          
          <Avatar className='my-auto' color="cyan" radius="xl">
          {
            file ? <Image src={file} alt="profile photo" radius="xl" /> : given_name?.charAt(0)+family_name?.charAt(0)
          }                  
          </Avatar>          
          <div className='my-auto hidden sm:block'>
            { localStorage.getItem('given_name')} { localStorage.getItem('family_name')}
          </div>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>

        <UserInfoCard />
          
      {/* 
        
        <Menu.Label>
          <div className='flex flex-row justify-between'>
            <div>
              Account
            </div>
            
              <ThemeToggle />
            
          </div>
        </Menu.Label>
        <Menu.Item
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => { akello.logout() }}
        >
          Sign Out          
        </Menu.Item>
        */}
      </Menu.Dropdown>
    </Menu>
  );
}

export default HeaderMenu;
