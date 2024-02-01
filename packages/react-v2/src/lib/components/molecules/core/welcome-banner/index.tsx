import React from 'react';
import classNames from "classnames";

export interface WelcomeBannerProps {
    first_name: string;
    classNames?: string
}


export const WelcomeBanner = (props: WelcomeBannerProps) => {

    return (
            <div className={classNames( props.classNames, 'text-4xl font-black')}>
                🌈 Welcome back, {props.first_name}
            </div>
    )
};
