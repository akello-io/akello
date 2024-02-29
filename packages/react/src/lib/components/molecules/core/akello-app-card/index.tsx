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
                <Card.Section>
                    <Image
                        src={akello_app.logo}
                        h={35}    
                        w="auto"
                        fit="contain"                    
                    />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{akello_app.name}</Text>
                    <Badge color={akello_app.status == 'active' ? "blue" : "pink"}>{
                        akello_app.status == 'active' ? "Active" : "Inactive"                    
                    }</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                    {akello_app.description}
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md" onClick={onClick}>
                    Configure
                </Button>
                </Card>
            </div>
        </>
    )
}