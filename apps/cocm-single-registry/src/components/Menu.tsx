import { rem } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useAkello } from "@akello/react-hook";
import { Avatar, Button, Menu, UnstyledButton } from '@mantine/core';
import ThemeToggle from './ThemeToggle';

const HeaderMenu = () => {
  const akello = useAkello();

  return (
    <>
      <Button variant='default' onClick={() => akello.logout()}>Sign Out</Button>
    </>
  )

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className='flex flex-row space-x-2'>
          {/* 
          <Avatar className='my-auto' color="cyan" radius="xl">VS</Avatar>
          */}          
          <div className='my-auto'>
            {akello.getUserName()}
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
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => { akello.logout() }}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default HeaderMenu;
