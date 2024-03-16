import { Container, Text, Button, Title, Paper, TextInput, Group, Anchor, Center } from '@mantine/core'
import { useAkello } from '@akello/react-hook'
import { useNavigate } from 'react-router-dom'
import { ForgotPasswordPage } from '@akello/react'

const RegistrySecurityPage = () => {
    const akello = useAkello();
    const navigate = useNavigate();

    return (
        <div>
        
            <div>
                <Container>                    
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Text>Password</Text>
                        <Group justify="space-between" mt="lg" >                                                                                     
                            <Button className={'bg-primary'} onClick={() => {
                                navigate('/change-password')                                
                            }}>Change password</Button>
                        </Group>
                    </Paper>
                </Container>
            </div>
        </div>
    );
 
}

export default RegistrySecurityPage;