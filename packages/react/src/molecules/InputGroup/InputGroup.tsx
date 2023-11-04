import React from "react";
import "./InputGroup.scss";

export interface InputGroup {
    label: string;
}

const InputGroup = (props: InputGroup) => {
    // test
    return <div>{props.label}</div>;
};

export default InputGroup;
