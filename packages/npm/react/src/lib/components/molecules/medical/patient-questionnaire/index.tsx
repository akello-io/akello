
import {Radio , RadioGroup, Text} from '@mantine/core';
import { useState } from 'react';
import { QuestionnaireField, QuestionnaireFieldProps } from '../../../atoms/medical/questionnaire-field';


interface PatientQuestionnaireProps {
    questions: QuestionnaireFieldProps[]
}


export const PatientQuestionnaire:React.FC<PatientQuestionnaireProps> = ({questions}) => {
    const [value, setValue] = useState<string>('')

    return (
        <>
            {
                questions.map((question, index) => {
                    return (
                        <QuestionnaireField
                            key={index}
                            question={question.question}
                            description={question.description}
                            options={question.options}
                            onSelect={(value) => setValue(value)}
                        />
                    )
                })
            }
        </>
    )


}