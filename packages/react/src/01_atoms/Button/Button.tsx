import React from 'react';
import classNames from "classnames";

export interface ButtonProps {
    label: string;
    size: 'sm' | 'md' | 'lg';
    type: 'normal' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link'
}

const Button = (props: ButtonProps) => {


    return <div className={classNames({
        "btn-sm" : props.size == 'sm',
        "btn-md" : props.size == 'md',
        "btn-lg" : props.size == 'lg',
        "btn-normal" : props.type == 'normal',
        "btn-primary" : props.type == 'primary',
        "btn-secondary" : props.type == 'secondary',
        "btn-accent" : props.type == 'accent',
        "btn-ghost" : props.type == 'ghost',
        "btn-link" : props.type == 'link',
    }, "btn btn-sm btn-primary")}>{props.label}</div>
};

export default Button;
