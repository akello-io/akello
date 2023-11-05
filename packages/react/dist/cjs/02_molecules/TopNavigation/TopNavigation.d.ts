import React from 'react';
export interface TopNavigationProps {
    logo: string;
    profile_photo: string;
    classNames: string;
}
declare const TopNavigation: (props: TopNavigationProps) => React.JSX.Element;
export default TopNavigation;
