import React from 'react';
export interface ButtonProps {
    label: string;
    size: 'sm' | 'md' | 'lg';
    type: 'normal' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
}
declare const Button: (props: ButtonProps) => React.JSX.Element;
export default Button;
