
import { Container, Text, Button, Title, Table, Paper, TextInput, Group, Anchor, Center } from '@mantine/core'
import { MultiSelect } from '@mantine/core';


const MeasurementsPage = () => {
    return (
        <div>
        
            <Container>                    
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <MultiSelect
                        checkIconPosition="right"
                        pb={30}
                        data={[
                            'Patient Health Questionnaire (PHQ-9)', 
                            'Generalised Anxiety Disorder (GAD-7)',
                            'General Health Questionnaire (GHQ)', 
                            'Insomnia Severity Index (ISI)',
                        ]}
                        searchable                                            
                        label="Select screeners"
                        placeholder="Pick a screener"
                        defaultValue={[
                            'Patient Health Questionnaire (PHQ-9)',
                            'Generalised Anxiety Disorder (GAD-7)'                            
                        ]
                        }
                    />
                    <Button  className={'bg-primary'} onClick={() => {
                                
                    }}>Save</Button>
                </Paper>
            </Container>

        </div>
    );
}

export default MeasurementsPage;