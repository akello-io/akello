import React from 'react';
export interface RegistrySelectRowProps {
    logo: string;
    name: string;
    members: number;
    patients: number;
    onClick: (registry_id: string) => void;
}
declare const RegistrySelectRow: (props: RegistrySelectRowProps) => React.JSX.Element;
export default RegistrySelectRow;
