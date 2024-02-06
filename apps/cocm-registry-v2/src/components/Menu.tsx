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


const HeaderMenu = () => {
  const akello = useAkello();
  const navigate = useNavigate();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>Toggle menu</UnstyledButton>
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
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>                
        <Menu.Divider />

        {akello.getSelectedRegistry() != undefined && (
          <>
            <Menu.Label>Registry</Menu.Label>
            <Menu.Item
              leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
              onClick={() => {navigate(`/registry/${akello.getSelectedRegistry()}/patient-referral`)}}
            >
              Invite Team Member
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
            >
              Delete Registry
            </Menu.Item>
            <Menu.Divider />
          </>

        )
        }


        <Menu.Label>Danger zone</Menu.Label>
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