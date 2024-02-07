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

const SignUpPage = () => {
    const navigate = useNavigate();

    return (
        <div className='w-screen'>
            <Center>
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        Get started with Akello
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Already have an account?{' '}
                        <Anchor size="sm" component="button" onClick={() => navigate('/')}>
                            Sign in
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label="Email" placeholder="you@mantine.dev" required />
                        <PasswordInput label="Password" placeholder="Your password" required mt="md" />                        
                        <Button fullWidth mt="xl" className='bg-primary'>
                            Sign Up
                        </Button>
                    </Paper>
                </Container>
            </Center>
        </div>
    );
};


export default SignUpPage


/*
const SignUpPage = () => {

    const navigate = useNavigate();
    return (
        <div>
            <SignUpForm onSuccess={() => navigate('/confirm')} onSiginClick={() => navigate('/login')}/>
        </div>
    );
}

 
export default SignUpPage;
*/