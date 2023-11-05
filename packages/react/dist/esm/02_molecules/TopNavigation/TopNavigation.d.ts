import React from 'react';
export interface TopNavigationProps {
    logo: string;
    profile_photo: string;
    email: string;
    classNames: string;
    logout: () => void;
    createRegistry: () => void;
}
declare const TopNavigation: (props: TopNavigationProps) => React.JSX.Element;
export default TopNavigation;
