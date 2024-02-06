import React, { useContext } from 'react';
import { ActionIcon } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';

const ThemeToggle = () => { 
  const { setColorScheme, clearColorScheme, colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      size={'sm'}
      variant="outline"      
      color={dark ? 'yellow' : 'blue'}
      onClick={() => setColorScheme(dark ? 'light' : 'dark')}
      title="Toggle color scheme"
    >
      {dark ? (
        <SunIcon style={{ width: 12, height: 12 }} />
      ) : (
        <MoonIcon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
}

export default ThemeToggle;