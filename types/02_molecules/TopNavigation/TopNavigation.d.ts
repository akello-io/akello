import React, { ReactNode } from 'react';
export interface TopNavigationProps {
    signIn: () => void;
    signOut: ((data?: any | undefined) => void) | undefined;
    profile_img: string;
    github_url?: string;
    signed_in: boolean;
    menu_items: ReactNode;
    theme_swapper: ReactNode;
    y_scroll_position?: number;
    sticky?: boolean;
}
declare const TopNavigation: (props: TopNavigationProps) => React.JSX.Element;
export default TopNavigation;
