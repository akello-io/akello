import React, { ReactNode } from 'react';

interface ButtonProps {
    label: string;
    size: 'sm' | 'md' | 'lg';
    type: 'normal' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
}
declare const Button: (props: ButtonProps) => React.JSX.Element;

interface WelcomeBannerProps {
    first_name: string;
    classNames?: string;
}
declare const WelcomeBanner: (props: WelcomeBannerProps) => React.JSX.Element;

interface WelcomeTemplateProps {
    first_name: string;
    children: ReactNode;
    bannerStyles?: string;
}
declare const WelcomeTemplate: (props: WelcomeTemplateProps) => React.JSX.Element;

export { Button, WelcomeBanner, WelcomeTemplate };
