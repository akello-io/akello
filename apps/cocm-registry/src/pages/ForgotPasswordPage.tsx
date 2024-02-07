import {
    TextInput,    
    Paper,
    Title,    
    Container,    
    Button,
    Center,
    Group,
    Anchor,
    Box,
    rem
  } from '@mantine/core';
import {IconArrowLeft} from '@tabler/icons-react';
import classes from './LoginPage.module.css';
import { useNavigate } from 'react-router';

const ForgotPasswordPage = () => {    
    const navigate = useNavigate();

    return (
        <div className='w-screen'>
            <Center>
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        Reset your password
                    </Title>                    
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label="Email" placeholder="you@mantine.dev" required />                                                                        
                        <Group justify="space-between" mt="lg" className={classes.controls}>
                            <Anchor c="dimmed" size="sm" className={classes.control} onClick={() => navigate('/')}>
                                <Center inline>
                                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                <Box ml={5}>Back to the login page</Box>
                                </Center>
                            </Anchor>
                            <Button className={'bg-primary'}>Reset password</Button>
                        </Group>
                    </Paper>
                </Container>
            </Center>
        </div>
    );
};


export default ForgotPasswordPage