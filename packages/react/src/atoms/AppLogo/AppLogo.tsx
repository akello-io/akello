import React, { useMemo } from "react";
import "./AppLogo.scss";


export interface AppLogoProps {
    src: string;
    size: 'sm' | 'md' | 'lg'
}

const AppLogo = (props: AppLogoProps) => {


    return <img className={props.size}  src={props.src} />
};

export default AppLogo;
