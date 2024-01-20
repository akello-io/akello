import React, { ReactNode } from 'react';
export interface WelcomeTemplateProps {
    first_name: string;
    children: ReactNode;
    bannerStyles?: string;
}
declare const WelcomeTemplate: (props: WelcomeTemplateProps) => React.JSX.Element;
export default WelcomeTemplate;
