import { AkelloClient } from '@akello/core';
import { createContext, useContext } from 'react';

export const reactContext = createContext(undefined as AkelloContext | undefined);

export type MepdlumNavigateFunction = (path: string) => void;

export interface AkelloContext {
  akello: AkelloClient;  
  loading: boolean;
}

export const useAkelloContext = ():AkelloContext => {
  return useContext(reactContext) as AkelloContext;
}


export const useAkello = ():AkelloClient => {
  return useAkelloContext().akello;
}