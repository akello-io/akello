import React from 'react';

export interface ButtonProps {
    label: string;
}

const Button = (props: ButtonProps) => {
    return <div className={"btn btn-sm btn-primary"}>{props.label}</div>
};

export default Button;
