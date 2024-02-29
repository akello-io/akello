import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import {ReactNode} from "react";
import * as React from "react";


export interface AkelloAppCardProps {
    id: string
    logo: string
    title: string
    description: string
    active: boolean
    onClick?: () => void
}

export const AkelloAppCard:React.FC<AkelloAppCardProps> = ({
    id,
    logo,
    title,
    description,
    active,
    onClick
}) => {

    return (
        <>

            <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src={logo}
                        h={35}    
                        w="auto"
                        fit="contain"                    
                    />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{title}</Text>
                    <Badge color={active ? "blue" : "pink"}>{
                        active ? "Active" : "Inactive"                    
                    }</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                    {description}
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md" onClick={onClick}>
                    Configure
                </Button>
                </Card>
            </div>
        </>
    )
}