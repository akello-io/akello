import React, { ReactNode } from 'react';
export interface RegistryMembershipsProps {
    children: ReactNode;
    onCreate: () => void;
}
declare const RegistryMemberships: (props: RegistryMembershipsProps) => React.JSX.Element;
export default RegistryMemberships;
