import { Container, Text, Button, Title, Table, Paper, TextInput, Group, Anchor, Center } from '@mantine/core'
import { useAkello } from '@akello/react-hook'
import { useNavigate } from 'react-router-dom'
import { ForgotPasswordPage } from '@akello/react'

const RegistrySecurityPage = () => {
    const akello = useAkello();
    const navigate = useNavigate();

   
    const elements = [
        { id: '1', os: 'Mac', browser: 'Chrome', ip: '222', auth: 'Password', date: '2021-10-10', time: '10:10', location: 'Kampala' },
        { id: '2', os: 'Mac', browser: 'Chrome', ip: '222', auth: 'Password', date: '2021-10-10', time: '10:10', location: 'Kampala' },
        { id: '3', os: 'Mac', browser: 'Chrome', ip: '222', auth: 'Password', date: '2021-10-10', time: '10:10', location: 'Kampala' },
        { id: '4', os: 'Mac', browser: 'Chrome', ip: '222', auth: 'Password', date: '2021-10-10', time: '10:10', location: 'Kampala' },
        { id: '5', os: 'Mac', browser: 'Chrome', ip: '222', auth: 'Password', date: '2021-10-10', time: '10:10', location: 'Kampala' },
        { id: '6', os: 'Mac', browser: 'Chrome', ip: '222', auth: 'Password', date: '2021-10-10', time: '10:10', location: 'Kampala' },
        { id: '7', os: 'Mac', browser: 'Chrome', ip: '222', auth: 'Password', date: '2021-10-10', time: '10:10', location: 'Kampala' },
      ];

    const rows = elements.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.os}</Table.Td>
            <Table.Td>{element.browser}</Table.Td>
            <Table.Td>{element.ip}</Table.Td>
            <Table.Td>{element.auth}</Table.Td>
            <Table.Td>{element.date}</Table.Td>
            <Table.Td>{element.time}</Table.Td>
            <Table.Td>{element.location}</Table.Td>
        </Table.Tr>
        ));
    
    

    return (
        <div>
            
            <div>
                

                <Container>                    
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Text fw={600}>Sessions</Text>                    
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>OS</Table.Th>
                                    <Table.Th>Browser</Table.Th>
                                    <Table.Th>IP Adress</Table.Th>
                                    <Table.Th>Auth Method</Table.Th>
                                    <Table.Th>Date</Table.Th>
                                    <Table.Th>Time</Table.Th>
                                    <Table.Th>Location</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>                                                
                    </Paper>
                </Container>

                <Container>                    
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Text fw={600}>Password</Text>
                        <Group justify="space-between" mt="lg" >                                                                                     
                            <Button className={'bg-primary'} onClick={() => {
                                navigate('/change-password')                                
                            }}>Change password</Button>
                        </Group>
                    </Paper>
                </Container>

                <Container>                    
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Text fw={600}>Multi-Factor Auth</Text>
                        <Text>Emrolled: False</Text>
                        <Group justify="space-between" mt="lg" >                                                                                     
                            <Button className={'bg-primary'} onClick={() => {
                                navigate('/change-password')                                
                            }}>Enroll</Button>
                        </Group>
                    </Paper>
                </Container>
            </div>
        </div>
    );
 
}

export default RegistrySecurityPage;