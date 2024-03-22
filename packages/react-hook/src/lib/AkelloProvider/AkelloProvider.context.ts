import { AkelloClient, Registry } from '@akello/core';
import { createContext, useContext } from 'react';

export const reactContext = createContext(undefined as AkelloContext | undefined);


export interface AkelloContext {
  akello: AkelloClient;  
  loading: boolean;
  isAuthenticated: boolean;
  username?: string;
  selectedRegistry?: Registry;
}

export const useAkelloContext = ():AkelloContext => {
  return useContext(reactContext) as AkelloContext;
}

export const useAkello = ():AkelloClient => {
  return useAkelloContext().akello;
}

export const useSelectedRegistry = ():Registry | undefined => {
  return useAkelloContext().selectedRegistry;
}
