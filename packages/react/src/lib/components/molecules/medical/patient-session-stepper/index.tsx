import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { Select, TextInput} from '@mantine/core';
import { PatientQuestionnaire } from '../patient-questionnaire';
import { ScrollArea } from '@mantine/core';

export interface PatientSessionStepperProps {
}

export const PatientSessionStepper: React.FC<PatientSessionStepperProps> = () => {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
      <div className='h-screen'>
        <Stepper active={active} onStepClick={setActive} size='xs' >
          <Stepper.Step label="Setup" description="Type of visit">
             <div>

                <Select
                    required
                    label="Select Visit Type"
                    placeholder="Pick value"
                    data={['Clinic', 'Phone', 'In-person w/ Patient']}
                />

                <Select
                    required
                    label="Select Contact Type"
                    placeholder="Pick value"
                    data={[
                        'Iniital Assessment',
                        'Follow Up',
                        'Psychiatric Consultation',
                        'Relapse Prevention Plan'
                    ]}
                    />

                <TextInput
                    required
                    label="Consulting Psychatrist NPI"
                    description="NPI for the Consulting Psychatrist"
                    placeholder="Enter NPI"
                    />



            </div>
          </Stepper.Step>
          <Stepper.Step label="Assessment" description="Assess the patient">
            <div>
                <PatientQuestionnaire questions={[
                    {
                        question: 'Little interest or pleasure in doing things?',
                        description: '',
                        options: [{
                            label: 'None at all',
                            value: '0'
                        },
                        {
                            label: 'Several days',
                            value: '1'
                        },
                        {
                            label: 'More than half the days',
                            value: '2'
                        },
                        {
                            label: 'Nearly every day',
                            value: '3'
                        }],
                        onSelect: (value) => console.log(value)
                    },
                {
                    question: 'Feeling down, depressed, or hopeless?',
                    description: '',
                    options: [{
                        label: 'None at all',
                        value: '0'
                    },
                    {
                        label: 'Several days',
                        value: '1'
                    },
                    {
                        label: 'More than half the days',
                        value: '2'
                    },
                    {
                        label: 'Nearly every day',
                        value: '3'
                    }],
                    onSelect: (value) => console.log(value)
                },
                {
                    question: 'Trouble falling or staying asleep, or sleeping too much?',
                    description: '',
                    options: [{
                        label: 'None at all',
                        value: '0'
                    },
                    {
                        label: 'Several days',
                        value: '1'
                    },
                    {
                        label: 'More than half the days',
                        value: '2'
                    },
                    {
                        label: 'Nearly every day',
                        value: '3'
                    }],
                    onSelect: (value) => console.log(value)
                },
                {
                    question: 'Feeling tired or having little energy?',
                    description: '',
                    options: [{
                        label: 'None at all',
                        value: '0'
                    },
                    {
                        label: 'Several days',
                        value: '1'
                    },
                    {
                        label: 'More than half the days',
                        value: '2'
                    },
                    {
                        label: 'Nearly every day',
                        value: '3'
                    }],
                    onSelect: (value) => console.log(value)
                },
                {
                    question: 'Poor appetite or overeating?',
                    description: '',
                    options: [{
                        label: 'None at all',
                        value: '0'
                    },
                    {
                        label: 'Several days',
                        value: '1'
                    },
                    {
                        label: 'More than half the days',
                        value: '2'
                    },
                    {
                        label: 'Nearly every day',
                        value: '3'
                    }],
                    onSelect: (value) => console.log(value)
                },
                {
                    question: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down?',
                    description: '',
                    options: [{
                        label: 'None at all',
                        value: '0'
                    },
                    {
                        label: 'Several days',
                        value: '1'
                    },
                    {
                        label: 'More than half the days',
                        value: '2'
                    },
                    {
                        label: 'Nearly every day',
                        value: '3'
                    }],
                    onSelect: (value) => console.log(value)
                },
                {
                    question: 'Trouble concentrating on things, such as reading the newspaper or watching television?',
                    description: '',
                    options: [{
                        label: 'None at all',
                        value: '0'
                    },
                    {
                        label: 'Several days',
                        value: '1'
                    },
                    {
                        label: 'More than half the days',
                        value: '2'
                    },
                    {
                        label: 'Nearly every day',
                        value: '3'
                    }],
                    onSelect: (value) => console.log(value)
                },
                {
                    question: 'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
                    description: '',
                    options: [{
                        label: 'None at all',
                        value: '0'
                    },
                    {
                        label: 'Several days',
                        value: '1'
                    },
                    {
                        label: 'More than half the days',
                        value: '2'
                    },
                    {
                        label: 'Nearly every day',
                        value: '3'
                    }],
                    onSelect: (value) => console.log(value)
                },
                {
                    question: 'Thoughts that you would be better off dead, or of hurting yourself in some way?',
                    description: '',
                    options: [{
                        label: 'None at all',
                        value: '0'
                        },
                        {
                            label: 'Several days',
                            value: '1'
                        },
                        {
                            label: 'More than half the days',
                            value: '2'
                        },
                        {
                            label: 'Nearly every day',
                            value: '3'
                        }
                    ],
                    onSelect: (value) => console.log(value)
                }
            ]} />



            </div>
          </Stepper.Step>
          <Stepper.Step label="Notes" description="Record any notes">
            <div>
                <Select
                        required
                        label="Flag patient"
                        placeholder="Pick value"
                        data={[
                            'Needs Discussion',
                            'Review with Psychatrist',
                            'Safety Risk'
                        ]}
                        />

                <TextInput
                    required
                    label="Problems list"
                    description="Enter commas separated list of problems (ICD-10 Codes)"
                    placeholder="Enter codes"
                    />
            </div>
          </Stepper.Step>
          <Stepper.Completed>
            <div>
                Completed - confirm to record
            </div>
          </Stepper.Completed>
        </Stepper>

        <Group mt="xl">
          <Button variant="default" onClick={prevStep}>Back</Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </div>
    );
}
