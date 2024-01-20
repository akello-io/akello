import { ReactNode } from "react";
import * as React from "react";
export interface HeaderComponentProps {
    title: string;
    buttons?: ReactNode[];
    isLoading?: boolean;
}
declare const AppHeaderSection: React.FC<HeaderComponentProps>;
export default AppHeaderSection;
