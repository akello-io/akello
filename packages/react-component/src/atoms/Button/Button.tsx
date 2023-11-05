import React from 'react';

export interface ButtonProps {
    label: string;
}

const Button = (props: ButtonProps) => {
    return <div className={"btn btn-primary"}>{props.label}</div>;
};

export default Button;
