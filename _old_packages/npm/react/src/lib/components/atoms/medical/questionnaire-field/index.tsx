
import {Radio , RadioGroup, Text} from '@mantine/core';
import { useState } from 'react';


export interface QuestionnaireFieldOption {
    value: number;
    label: string;
}

export interface QuestionnaireFieldProps {
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
                <div className='space-y-1'>
                    {options.map((option, index) => (
                        <Radio key={index} value={option.value} label={option.label} />
                    ))}
                </div>

            </RadioGroup>
        </>
    )


}