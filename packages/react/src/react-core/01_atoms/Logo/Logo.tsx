import React from 'react';
import classNames from "classnames";

interface LogoProps {
    /**
     * Logo Img Source
     */
    src: string
    alt?: string
}

/**
 * Primary UI component for user interaction
 */
const Logo:React.FC<LogoProps> = ({src, alt}) => {
    return (
        <img
            className="h-8 w-auto"
            src={src}
            alt={alt}
        />
    );
};

export default Logo
