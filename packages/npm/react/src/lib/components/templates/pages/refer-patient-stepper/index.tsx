import { useEffect, useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { TextInput, Box, MultiSelect, Container, Center } from '@mantine/core';


interface ReferPatientStepperProps {
    onNavigate: (path: string) => void;
}

export const ReferPatientStepper:React.FC<ReferPatientStepperProps> = ({onNavigate}) => {
    const [active, setActive] = useState(0);
    const [name, setName] = useState('');
    const [measurements, setMeasurements] = useState([]);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    useEffect(() => {
        if(active === 3) {
            onNavigate('/patient-referral')
        }
    }, [active])

    return (
        <>
            <Container px={0} pt={40}>
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} size={'md'}>
                    <Stepper.Step label="Welcome" description="Get started">
                        <div className="px-6 pt-24 sm:px-6 sm:pt-32 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Welcome to your new registry.
                                <br />
                                Start adding patients today.
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 ">
                                Get started by adding a patient to your registry. You can add more patients later.
                            </p>

                            </div>
                        </div>
                    </Stepper.Step>
                    <Stepper.Step label="Security" description="SOC 2 and HIPAA">
                        <div className="px-6 pt-24 sm:px-6 sm:pt-32 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                We are SOC 2 and HIPAA compliant.
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 ">
                                All our plans are within our SOC 2 security scope and for our non evaluation plans, we sign a Business Associate Agreement (BAA) with you.
                            </p>

                            </div>
                        </div>
                    </Stepper.Step>
                    <Stepper.Step label="Refer a patient" description="Add your first patient">
                        <div className="px-6 pt-24 sm:px-6 sm:pt-32 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Add your first patient
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 ">
                                Lets begin by adding your first patient to your registry. You can add more patients later.
                            </p>

                            </div>
                        </div>
                    </Stepper.Step>
                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>
                <Group justify="center" mt="xl">
                    <Button onClick={nextStep}>Next</Button>
                </Group>

            </Container>


        </>
    );
}