import {Radio} from "@mantine/core";

import {
    Questionnaire,
    QuestionnaireQuestion
} from "@akello/core";
import { useState, useEffect } from "react";


interface QuestionnaireFormProps {
    questionnaire: Questionnaire;
    onSelectedResponsesChange: (responses: {}) => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ questionnaire, onSelectedResponsesChange }) => {
        
    const [selectedResponses, setSelectedResponses] = useState({})
    
    useEffect(() => {
        onSelectedResponsesChange(
            {
                'responses': selectedResponses,
                'name': questionnaire.name                
            }
            
        )
    }, [selectedResponses])
    
    return (
        <>
            <div>
                <div>{questionnaire.name}</div>                
                {
                    
                    //TODO: need to fix the schema definiation for questionnaire
                    questionnaire.questions.map((question: QuestionnaireQuestion) => {
                        
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
        </>
    )
}


export default QuestionnaireForm;