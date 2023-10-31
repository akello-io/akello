import React from 'react';
import classNames from "classnames";

interface LogoProps {
    /**
     * Logo Img Source
     */
    src: string
}

/**
 * Primary UI component for user interaction
 */
export const Logo:React.FC<LogoProps> = ({src}) => {
    return (
        <img src={src} />
    );
};

