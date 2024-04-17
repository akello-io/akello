import {Radio, Container, Center, Box, Text} from "@mantine/core";

import {
    Questionnaire,
    QuestionnaireQuestion
} from "@akello/core";
import { useState, useEffect } from "react";


interface QuestionnaireFormProps {
    questionnaire: Questionnaire;
    onSelectedResponsesChange: (responses: {}) => void;
}

export const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ questionnaire, onSelectedResponsesChange }) => {
    const [selectedResponses, setSelectedResponses] = useState({})
    useEffect(() => {
        onSelectedResponsesChange(
            {
                'responses': selectedResponses,
                'name': questionnaire.name
            }

        )
    }, [selectedResponses])

    const demoProps = {
        bg: 'var(--mantine-color-blue-light)',
        py: 'md',
      };

    return (
        <>
            <div className='border border-1'>
                <Container fluid {...demoProps}>
                    <Center inline>
                        <Box ml={5}>
                            <Text fw={500}>
                                {questionnaire.name}
                            </Text>
                        </Box>
                    </Center>
                </Container>

                <div className='p-2 space-y-2'>
                {
                    //TODO: need to fix the schema definiation for questionnaire
                    questionnaire.measurements.map((question: QuestionnaireQuestion) => {
                        return (
                            <>
                                <Radio.Group
                                    label={question.question}
                                    required
                                >
                                    <div className='flex flex-col space-y-1'>
                                        {
                                            question.responses.map((response) => {
                                                return (
                                                    <>
                                                        <Radio label={response.response} value={String(response.score)} onClick={() => {
                                                            setSelectedResponses({
                                                                ...selectedResponses,
                                                                [question.id]: response.score
                                                            })

                                                        }} />
                                                    </>

                                                )
                                            })
                                        }
                                    </div>

                                </Radio.Group>
                            </>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}


export default QuestionnaireForm;