import { Questionnaire, QuestionnaireResponse }  from 'fhir/r4'
import { TextInput, Checkbox, Button, Group, Box, Select } from '@mantine/core';
import { useForm } from '@mantine/form';



export interface QuestionnaireFormProps {
    questionnaire: Questionnaire
}

export const QuestionnaireForm:React.FC<QuestionnaireFormProps> = ({questionnaire}) => {
    
    const valueSet = questionnaire.contained?.find((item) => item.resourceType === 'ValueSet')
        
    let optionCodes = valueSet?.compose?.include?.map((item) => {
        return item.concept?.map((concept) => {            
            return {
                code: concept.code,
                display: concept.display                
            }                                    
        })        
    })
    

    const form = useForm({
        initialValues: {          
        },
    
        
        
      });
    


    return (
        <Box maw={340} mx="auto">                    
        <form onSubmit={form.onSubmit((values) => {            
            const response = {
                'resourceType': 'QuestionnaireResponse',
                'status': 'completed',
                'questionnaire': questionnaire.url,
                'item': [
                    {
                        'linkId': 'H1/T1',
                        'item': Object.keys(values).map((key, index) => {                                        
                            return {
                                'linkId': values[key].linkId,
                                'text': values[key].text,
                                'answer': values[key].answer
                            }
                        })
                    }
                ]                
            } as QuestionnaireResponse
            debugger;
        })}>
          
          {questionnaire.item?.map((item, index) => {
            return (
                <div key={index}>
                    {item.text}
                    {item.item?.map((subItem, subIndex) => {
                        return (
                            <div key={subIndex}>                                                                
                                <Select
                                    label={subItem.text}                                    
                                    placeholder="Pick value"                                                                        
                                    onChange={(value) => {                                        
                                        let valueCoding = optionCodes[0].find((option) => option.display === value)                                        
                                        const answer = {
                                            'linkId': subItem.linkId,
                                            'text': subItem.text,
                                            'answer': [
                                                {
                                                    "valueCoding": valueCoding                  
                                                }
                                            ]
                                        }
                                        debugger;
                                        form.setFieldValue(subItem.linkId, answer)
                                    }}
                                    data={optionCodes[0].map((option) => {return option.display})}
                                />
                            </div>
                        )
                    })}
                </div>
            )
          })}
  
          <Group justify="flex-end" mt="md">
            <Button type='submit'>Submit</Button>
          </Group>
        </form>
      </Box>
    )
}
