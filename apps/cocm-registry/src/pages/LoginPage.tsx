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

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className='w-screen'>
            <Center>
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        Welcome back!
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Do not have an account yet?{' '}
                        <Anchor size="sm" component="button" onClick={() => navigate('/signup')}>
                            Create account
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label="Email" placeholder="you@mantine.dev" required />
                        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                        <Group justify="space-between" mt="lg">
                            <Checkbox label="Remember me" />
                            <Anchor component="button" size="sm" onClick={() => navigate('/forgot-password')}>
                                Forgot password?
                            </Anchor>
                        </Group>
                        <Button fullWidth mt="xl" className='bg-primary'>
                            Sign in
                        </Button>
                    </Paper>
                </Container>
            </Center>
        </div>
    );
};


export default LoginPage