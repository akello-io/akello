
import { Container, Text, Button, Title, Table,Stack,  Paper, TextInput, Group, Anchor, Center } from '@mantine/core'
import { MultiSelect } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useAkello } from '@akello/react-hook';
import { notifications } from '@mantine/notifications';
import { Measurement } from '@akello/core';


interface MeasurementsPageProps {
    registry_id: string
}




export const MeasurementsPage:React.FC<MeasurementsPageProps> = ({registry_id}) => {
    const akello = useAkello();
    const [_measurements, setMeasurements] = useState([])

    useEffect(() => {
        akello.registryService.getRegistry(registry_id, (data: any) => {
            setMeasurements(data.measurements)
        })
    },[])


    if (_measurements.length === 0) {
        return <div>No measures registered...</div>
    }

    return (
        <div>
            <Container>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <MultiSelect
                        checkIconPosition="right"
                        pb={30}
                        data={_measurements?.map((measurement: any) => measurement.name)}
                        defaultValue={_measurements?.filter((measurement: any) => measurement.active === true).map((measurement: any) => measurement.name)}


                        searchable
                        label="Select screeners"
                        placeholder="Pick a screener"
                        onChange={(value: any) => {
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
                        akello.registryService.setMeasurements(registry_id, _measurements, (data: any) => {
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

