import React from 'react';
export interface WelcomeBannerProps {
    first_name: string;
    classNames?: string;
}
declare const WelcomeBanner: (props: WelcomeBannerProps) => React.JSX.Element;
export default WelcomeBanner;
