
import { Container, Text, Button, Title, Table,Stack,  Paper, TextInput, Group, Anchor, Center } from '@mantine/core'
import { MultiSelect } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useAkello } from '@akello/react-hook';
import { notifications } from '@mantine/notifications';


export interface MeasurementsPageProps {
    measurements: any;
}


export const MeasurementsPage:React.FC<MeasurementsPageProps> = ({ measurements }) => {
    const akello = useAkello();
    const [_measurements, setMeasurements] = useState(measurements)

    const selections = _measurements?.map((measurement: any) => {
        return measurement.name
    })

    return (
        <div>

            <Container>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <MultiSelect
                        checkIconPosition="right"
                        pb={30}
                        data={selections}
                        searchable
                        label="Select screeners"
                        placeholder="Pick a screener"
                        defaultValue={
                            _measurements?.filter((measurement: any) => {
                                if(measurement.active === true) {
                                    return measurement.name
                                }
                            }).map((measurement: any) => {
                                return measurement.name
                            })
                        }
                        onChange={(value) => {
                            _measurements?.map((measurement: any) => {
                                if(value.includes(measurement.name))
                                {
                                    measurement.active = true
                                }
                                else
                                {
                                    measurement.active = false
                                }
                            })
                            setMeasurements([..._measurements!])
                        }}
                    />
                    <Button  className={'bg-primary'} onClick={() => {
                        akello.registryService.setMeasurements(akello.getSelectedRegistry()!.id, _measurements, (data: any) => {
                            console.log('measurements updated')

                            notifications.show({
                                title: 'Measurements updated',
                                message: 'Measurements have been updated',
                                color: 'green',
                            });

                        });
                    }}>Save</Button>
                </Paper>
            </Container>

            {
                _measurements?.map((measurement: any) => {
                    if(measurement.active === true && measurement.type === 'survey')
                    {
                        return (
                            <Container>
                                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                    <Text fw={700}> {measurement.name} </Text>
                                    <Stack>
                                        {
                                            measurement.measurements.map((measurement: any) => {
                                                return (
                                                    <>
                                                        <Text> {measurement.question} </Text>
                                                        {
                                                            measurement.responses.map((response: any) => {
                                                                return (
                                                                    <Stack>
                                                                        <Text> {response.score} - {response.response} </Text>
                                                                    </Stack>
                                                                )
                                                            })

                                                        }
                                                    </>

                                                )
                                            })
                                        }
                                    </Stack>
                                </Paper>
                            </Container>
                        )
                    }

                })
            }
        </div>
    );
}

