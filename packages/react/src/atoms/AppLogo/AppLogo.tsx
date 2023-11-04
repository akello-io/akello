import React from "react";
import "./AppLogo.scss";

export interface AppLogoProps {
    src: string;
    size: 'sm' | 'md' | 'lg'
}

const AppLogo = (props: AppLogoProps) => {
    return <img  className={"w-12 h-12"} src={props.src} />
};

export default AppLogo;
