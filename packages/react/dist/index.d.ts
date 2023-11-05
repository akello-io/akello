import React, { ReactNode } from 'react';

interface ButtonProps {
    label: string;
    size: 'sm' | 'md' | 'lg';
    type: 'normal' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
}
declare const Button: (props: ButtonProps) => React.JSX.Element;

interface RegistrySelectRowProps {
    logo: string;
    name: string;
    members: number;
    patients: number;
    onClick: (registry_id: string) => void;
}
declare const RegistrySelectRow: (props: RegistrySelectRowProps) => React.JSX.Element;

interface TopNavigationProps {
    logo: string;
    profile_photo: string;
    classNames: string;
}
declare const TopNavigation: (props: TopNavigationProps) => React.JSX.Element;

interface WelcomeBannerProps {
    first_name: string;
    classNames?: string;
}
declare const WelcomeBanner: (props: WelcomeBannerProps) => React.JSX.Element;

interface RegistryMembershipsProps {
    children: ReactNode;
}
declare const RegistryMemberships: (props: RegistryMembershipsProps) => React.JSX.Element;

interface WelcomeTemplateProps {
    first_name: string;
    children: ReactNode;
    bannerStyles?: string;
}
declare const WelcomeTemplate: (props: WelcomeTemplateProps) => React.JSX.Element;

export { Button, RegistryMemberships, RegistrySelectRow, TopNavigation, WelcomeBanner, WelcomeTemplate };
