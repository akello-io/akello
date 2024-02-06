import { AkelloClient } from '@akello/core';
import { createContext, useContext } from 'react';

export const reactContext = createContext(undefined as AkelloContext | undefined);


export interface AkelloContext {
  akello: AkelloClient;  
  loading: boolean;
  isAuthenticated: boolean;
  username?: string
}

export const useAkelloContext = ():AkelloContext => {
  return useContext(reactContext) as AkelloContext;
}


export const useAkello = ():AkelloClient => {
  return useAkelloContext().akello;
}
