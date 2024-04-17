import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { Select, TextInput} from '@mantine/core';


export interface PatientSessionStepperProps {
}

export const PatientSessionStepper: React.FC<PatientSessionStepperProps> = () => {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
      <>
        <Stepper active={active} onStepClick={setActive} size='xs'>
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
                Run the screener
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
      </>
    );
}
