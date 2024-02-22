import { FhirResource, Questionnaire, QuestionnaireResponse, ValueSet }  from 'fhir/r4'
import { TextInput, Checkbox, Button, Group, Box, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from "axios";


export interface QuestionnaireFormProps {
    questionnaire: Questionnaire
}

export const QuestionnaireForm:React.FC<QuestionnaireFormProps> = ({questionnaire}) => {    
    
    const valueSet = questionnaire.contained?.find((item) => item.resourceType === 'ValueSet') as ValueSet
        
    let optionCodes = valueSet!.compose!.include.map((item) => {
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
        <form onSubmit={form.onSubmit((values: any) => {            
            const response = {
                'resourceType': 'QuestionnaireResponse',
                'status': 'completed',
                'questionnaire': questionnaire.url,
                'contained': questionnaire.contained,
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
            console.log(response)    
            axios.post('http://127.0.0.1:8000/v1/fhir', response)
                .then((resp) => {                    
                })
                .catch((error) => {                    
                });
        })}>
          
          {questionnaire.item?.map((item, index) => {
            return (
                <div key={index}>
                    {item.text}
                    {item.item?.map((subItem, subIndex) => {

                        if(subItem.type !== 'choice')
                        {
                            return (<></>)
                        }
                        return (
                            <div key={subIndex}>                                                                                                    
                                <Select                                    
                                    label={subItem.text}                                    
                                    placeholder="Pick value"                                           
                                    onChange={(value: any) => {  
                                        let valueCoding = optionCodes?.[0]?.find((option) => option.display === value);
                                        if (valueCoding) {
                                            const answer = {
                                                'linkId': subItem.linkId,
                                                'text': subItem.text,
                                                'answer': [
                                                    {
                                                        "valueCoding": valueCoding          
                                                    }
                                                ]
                                            };
                                            form.setFieldValue(subItem.linkId, answer);
                                        }
                                    }}
                                    data={optionCodes![0]!.map((option) => option!.display!)}
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
