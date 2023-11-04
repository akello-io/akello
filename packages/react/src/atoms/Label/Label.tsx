import React, { useMemo } from "react";
import "./Label.scss";


export interface LabelProps {
    text: string;
}

const Label = (props: LabelProps) => {


    return <div>{props.text}</div>
};

export default Label;
