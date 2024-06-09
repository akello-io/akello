import { Menu, UnstyledButton, Avatar, Image} from '@mantine/core';
import { useState } from 'react';
import { UserInfoCard } from '../../../molecules/core';
import { useAkello } from '@akello/react-hook';


interface HeaderMenuProps {
  signOut: () => void;
}

export const HeaderMenu:React.FC<HeaderMenuProps> = ({signOut}) => {
  const akello = useAkello();
  const userProfileInfo = akello.getProfileInfo();

  const given_name = userProfileInfo?.given_name;
  const family_name = userProfileInfo?.family_name;
  const photo  = userProfileInfo?.photo;

  return (
    <Menu shadow="md" width={300}>
      <Menu.Target>
        <UnstyledButton className='flex flex-row space-x-2'>
          <Avatar className='my-auto mx-auto' color="cyan" radius="xl">
          {
            photo ? <Image src={photo} alt="profile photo" radius="xl" /> : given_name?.charAt(0)!+family_name?.charAt(0)
          }
          </Avatar>
          <div className='my-auto hidden sm:block'>
            { localStorage.getItem('given_name')} { localStorage.getItem('family_name')}
          </div>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>

        <UserInfoCard signOut={signOut} />

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

