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
    email: string;
    classNames: string;
    logout: () => void;
    createRegistry: () => void;
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

interface HomePageProps {
    app_logo: string;
    first_name: string;
    email: string;
    profile_photo: string;
    token: string;
    signOut?: () => void;
}
declare const HomePage: (props: HomePageProps) => React.JSX.Element;

export { Button, HomePage, RegistryMemberships, RegistrySelectRow, TopNavigation, WelcomeBanner, WelcomeTemplate };
