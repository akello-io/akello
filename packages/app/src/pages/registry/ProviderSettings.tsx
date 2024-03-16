import { Container, Text, Button, Title, Table, Paper, TextInput, Group, Anchor, Center } from '@mantine/core'
import { useState } from 'react'

interface Provider {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
}

const ProviderSettings = () => {

    const [newProvider, setNewProvider] = useState<Provider>({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: ""
    });

    const [providers, setProviders] = useState<Provider[]>([]);


    const handleUpdate = (e: any) => {        
        const key = e.currentTarget.id as keyof Provider;
        setNewProvider(
            {
                ...newProvider,
                [key]: e.currentTarget.value
            }
        )
    }
    return (
        <div>
            {
                providers.map((provider, index) => {
                    return (
                        <Container>                    
                            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                <Title order={3}>{provider.name}</Title>
                                <Group>
                                    <Text>{provider.address}</Text>
                                    <Text>{provider.city}, {provider.state} {provider.zip}</Text>
                                    <Text>{provider.phone}</Text>
                                    <Text>{provider.email}</Text>
                                </Group>
                            </Paper>
                        </Container>
                    )
                })
            }

            <Container>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <Title order={3}>Add Provider</Title>
                    <Group>
                        <TextInput id={'name'} value={newProvider.name} onChange={handleUpdate} label="Name" placeholder="Provider Name" />
                        <TextInput id={'address'} value={newProvider.address} onChange={handleUpdate} label="Address" placeholder="Address" />
                        <TextInput id={'city'} value={newProvider.city} onChange={handleUpdate}  label="City" placeholder="City" />
                        <TextInput id={'state'} value={newProvider.state} onChange={handleUpdate}  label="State" placeholder="State" />
                        <TextInput id={'zip'} value={newProvider.zip} onChange={handleUpdate}  label="Zip" placeholder="Zip" />
                        <TextInput id={'phone'} value={newProvider.phone} onChange={handleUpdate}  label="Phone" placeholder="Phone" />
                        <TextInput id={'email'} value={newProvider.email} onChange={handleUpdate}  label="Email" placeholder="Email" />
                    </Group>
                    <Center pt={40}>
                        <Button 
                            fullWidth variant="light"
                            onClick={() => {
                                setProviders([...providers, newProvider]);
                             
                                setNewProvider({
                                    name: "",
                                    address: "",
                                    city: "",
                                    state: "",
                                    zip: "",
                                    phone: "",
                                    email: ""
                                });
                            }}
                            >
                                Add Provider
                        </Button>
                    </Center>
                </Paper>
            </Container>
            
        </div>
    );
}

export default ProviderSettings;