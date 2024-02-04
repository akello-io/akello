import { AkelloClient } from '@akello/core';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { MepdlumNavigateFunction, reactContext } from './AkelloProvider.context';

export interface AkelloProviderProps {
  readonly akello: AkelloClient;
  readonly children: ReactNode;
}


export const AkelloProvider = (props: AkelloProviderProps): JSX.Element => {
  const akello = props.akello;
  
  const [state, setState] = useState({ 
    loading: false       
  });

  useEffect(() => {    
  }, []);

  const akelloContext = useMemo(
    () => ({
      ...state,
      akello,      
    }),
    [state, akello]
  );

  return <reactContext.Provider value={akelloContext}>{props.children}</reactContext.Provider>;
}
