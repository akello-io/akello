import React, {ReactNode} from 'react';
import classNames from "classnames";
import {WelcomeBanner} from "../../02_molecules";

export interface WelcomeTemplateProps {
    first_name: string
    children: ReactNode
    bannerStyles?: string
}

const WelcomeTemplate = (props: WelcomeTemplateProps) => {
    return (
        <div className="p-4 mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:px-8 lg:py-20 space-y-12">
            <WelcomeBanner first_name={props.first_name}  classNames={props.bannerStyles}/>
            {props.children}
        </div>
    )
};
export default WelcomeTemplate;
