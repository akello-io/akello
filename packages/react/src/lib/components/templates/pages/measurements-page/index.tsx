
import { Container, Text, Button, Title, Table,Stack,  Paper, TextInput, Group, Anchor, Center } from '@mantine/core'
import { MultiSelect } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useAkello } from '@akello/react-hook';
import { notifications } from '@mantine/notifications';

export const MeasurementsPage = () => {
    const akello = useAkello();
    const [measurements, setMeasurements] = useState(akello.getSelectedRegistry()?.measurements)
    const [selected, setSelected] = useState([])

    useEffect(() => {


    }, [measurements])

    const selections = measurements?.map((measurement) => {
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
                            measurements?.filter((measurement) => {
                                if(measurement.active === true) {
                                    return measurement.name
                                }
                            }).map((measurement) => {
                                return measurement.name
                            })
                        }
                        onChange={(value) => {
                            measurements?.map((measurement) => {
                                if(value.includes(measurement.name))
                                {
                                    measurement.active = true
                                }
                                else
                                {
                                    measurement.active = false
                                }
                            })
                            setMeasurements([...measurements!])
                        }}
                    />
                    <Button  className={'bg-primary'} onClick={() => {
                        akello.registryService.setMeasurements(akello.getSelectedRegistry()!.id, measurements, (data: any) => {
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
                measurements?.map((measurement) => {
                    if(measurement.active === true)
                    {
                        return (
                            <Container>
                                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                    <Text fw={700}> {measurement.name} </Text>
                                    <Stack>
                                        {
                                            measurement.measurements.map((measurement) => {
                                                return (
                                                    <>
                                                        <Text> {measurement.question} </Text>
                                                        {
                                                            measurement.responses.map((response) => {
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

