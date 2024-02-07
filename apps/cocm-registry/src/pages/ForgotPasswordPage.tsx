import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Center
  } from '@mantine/core';
// import classes from './AuthenticationTitle.module.css';

import { SignInForm } from '@akello/react';
import { useNavigate } from 'react-router';
import { useRegistry } from '@akello/react-hook';

import classes from './LoginPage.module.css';

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
                        <Button fullWidth mt="xl" className='bg-primary'>
                            Reset Password
                        </Button>
                    </Paper>
                </Container>
            </Center>
        </div>
    );
};


export default ForgotPasswordPage