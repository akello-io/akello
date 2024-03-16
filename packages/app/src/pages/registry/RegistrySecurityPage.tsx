import { Container, Text, Button, Title, Table, Paper, TextInput, Group, Anchor, Center } from '@mantine/core'
import { useAkello } from '@akello/react-hook'
import { useNavigate } from 'react-router-dom'
import { ForgotPasswordPage } from '@akello/react'
import { useEffect } from 'react'
import { useState } from 'react'
import parser from 'ua-parser-js'

const RegistrySecurityPage = () => {
    const akello = useAkello();
    const navigate = useNavigate();



    const [elements, setElements] = useState<{ os: any; browser: any; ip: any; auth: any; date: any; time: any; location: any; }[]>([]);

    useEffect(() => {   
        akello.userService.getUserSessions((data) => {                   
            let data_parsed_items = [];
            for (let i = 0; i < data.length; i++) {
                const data_parsed = parser(data[i]['user-agent']);
                data_parsed_items.push({
                    os: data_parsed.os.name,
                    browser: data_parsed.browser.name,
                    ip: data[i]['ip_address'],
                    auth: data[i]['auth_method'],
                    date: data[i]['date'],
                    time: data[i]['sort_key'],
                    location: data[i]['location']
                })
                
            }   
            setElements([...elements, ...data_parsed_items]);         
        });
    }, [akello]);

    const rows = elements.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.os}</Table.Td>
            <Table.Td>{element.browser}</Table.Td>
            <Table.Td>{element.ip}</Table.Td>                    
            <Table.Td>{element.time}</Table.Td>            
        </Table.Tr>
        ));
    
    

    return (
        <div>
            
            <div>
                

                <Container>                    
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Text fw={600}>Logins</Text>                    
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>OS</Table.Th>
                                    <Table.Th>Browser</Table.Th>
                                    <Table.Th>IP Adress</Table.Th>                                                                        
                                    <Table.Th>Time</Table.Th>                                    
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