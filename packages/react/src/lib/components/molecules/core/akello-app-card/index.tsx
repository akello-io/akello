import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { AkelloApp } from '@akello/core'
import {ReactNode} from "react";
import * as React from "react";


export interface AkelloAppCardProps {
    akello_app: AkelloApp
    onClick?: () => void
}

export const AkelloAppCard: React.FC<AkelloAppCardProps> = ({
    akello_app,
    onClick
}) => {

    return (
        <>
            <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>                                
                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{akello_app.name}</Text>
                    {
                        akello_app.status == 'active' && (
                            <Badge color="green">
                                Active
                            </Badge>
                        )
                    }                    
                </Group>

                <Text size="sm" c="dimmed">
                    {akello_app.description}
                </Text>

                <Button color="blue" disabled={akello_app.status !== 'active'}  fullWidth mt="md" radius="md" onClick={onClick}>
                    Configure
                </Button>
                </Card>
            </div>
        </>
    )
}