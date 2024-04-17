
import {Radio , RadioGroup, Text} from '@mantine/core';
import { useState } from 'react';


export interface QuestionnaireFieldOption {
    value: string;
    label: string;
}

interface QuestionnaireFieldProps {
    question: string;
    description: string;
    options: QuestionnaireFieldOption[];
    onSelect: (value: string) => void;
}

export const QuestionnaireField:React.FC<QuestionnaireFieldProps> = ({question, description, options, onSelect}) => {
    const [value, setValue] = useState<string>('')

    return (
        <>
            <RadioGroup
                value={value}
                onChange={setValue}
                label={question}
                description={description}
                required
            >
                {options.map((option) => (
                    <Radio key={option.value} value={option.value} label={option.label} />
                ))}
            </RadioGroup>
        </>
    )


}