import React from 'react';
import { ReactNode } from "react";
interface NavigationButtonProps {
    name: string;
    short_name: string;
    icon: ReactNode;
    is_active: boolean;
    navigate: () => void;
}
declare const SideNavigationButton: React.FC<NavigationButtonProps>;
export default SideNavigationButton;
