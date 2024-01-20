import React, { ReactNode } from "react";
export interface SideNavigationProps {
    logo: ReactNode;
    top_navigation: any[];
    bottom_navigation: any[];
}
declare const SideNavigation: React.FC<SideNavigationProps>;
export default SideNavigation;
