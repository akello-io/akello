import { useState } from 'react';
import { Checkbox, Box, LoadingOverlay, Anchor, Paper, Title, Text, Container, Group, Button, Center } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAkello } from '@akello/react-hook';

import { useDisclosure } from '@mantine/hooks';


interface LoginPageProps {
    onSuccess?: (token: string) => void;
    onFail?: (error: any) => void;
    onSignupClick: () => void;
    onForgotPasswordClick: () => void;
}

export const LoginPage:React.FC<LoginPageProps> = ({onSuccess, onFail, onSignupClick, onForgotPasswordClick}) => {    
    const akello = useAkello();
    const [error, setError] = useState<string | null>(null);
    const [visible, { toggle }] = useDisclosure(false);


    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required')
    });

    const handleSubmit = (values: { email: string; password: string }) => {        
        toggle();        
        akello.login(
            values.email,
            values.password,
            (token: string) => {  
                akello.setUserName(values.email);                  
                onSuccess && onSuccess(token);
                toggle();
            },
            (err: any) => {
                setError(err.message);
                onFail && onFail(err);
                toggle();
            }
        );
    };


    const handleOnKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
        >
            {({ errors, touched }) => (
                <Form>
                    <Box pos="relative">
                        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                        {/* ...other content */}
                        <div className="w-screen">
                            <Center>
                                <Container size={420} my={40}>
                                    <Title ta="center">
                                        Welcome back!
                                    </Title>
                                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                                        Do not have an account yet?{' '}
                                        <Anchor size="sm" component="button" onClick={() => onSignupClick()}>
                                            Create account
                                        </Anchor>
                                    </Text>

                                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                        <Field
                                            name="email"
                                            placeholder="Enter your email address"
                                            className="input input-bordered bg-white w-full"
                                            onKeyDown={handleOnKeyDown}
                                        />
                                        <div className="label text-error">
                                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                        </div>
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            className="input input-bordered bg-white w-full"
                                            onKeyDown={handleOnKeyDown}
                                        />
                                        <div className="label text-error">
                                            {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                        </div>
                                        <Group justify="space-between" mt="lg">                                        
                                            <Anchor component="button" size="sm" onClick={() => onForgotPasswordClick()}>
                                                Forgot password?
                                            </Anchor>
                                        </Group>
                                        <Button type="submit" fullWidth mt="xl" className="bg-primary">
                                            Sign in
                                        </Button>
                                        <div className="label text-error">{error ? <div>{error}</div> : null}</div>
                                    </Paper>
                                </Container>
                            </Center>
                        </div>
                    </Box>
                    
                </Form>
            )}
        </Formik>
    );
};
