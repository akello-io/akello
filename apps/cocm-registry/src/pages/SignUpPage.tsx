import React, { useState } from 'react';
import { Anchor, Paper, Title, Text, Container, Button, Center } from '@mantine/core';
import { useNavigate } from 'react-router';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAkello } from '@akello/react-hook';
import classes from './LoginPage.module.css';

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(2, 'Too Short!').max(50, 'Too Long!'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

interface SignUpFormProps {
    onSuccess?: () => void;
    onFail?: () => void;
    onSiginClick: () => void;
}

const SignUpPage: React.FC<SignUpFormProps> = () => {
    const [submissionError, setSubmissionError] = useState('');
    const akello = useAkello();
    const navigate = useNavigate();

    return (
        <div className="w-screen">
            <Center>
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        Welcome.
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Already have an account?{' '}
                        <Anchor size="sm" component="button" onClick={() => navigate('/')}>
                            Sign in
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: ''
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={values => {
                                akello.signup(values.email, values.password, (user: any) => {
                                    console.log(user);
                                    akello.setUserName(values.email);
                                    navigate('/signup/confirm');
                                }, (err: any) => {
                                    setSubmissionError(err.message);
                                });
                            }}
                        >
                            {({ errors, touched }) => (
                                <div>
                                    <Form className="space-y-4">
                                        <div className="flex flex-wrap -mx-3 mb-4">
                                            <div className="w-full px-3">
                                                <label className="block text-sm font-medium mb-1" htmlFor="name">
                                                    Name <span className="text-red-600">*</span>
                                                </label>
                                                <Field
                                                    name="name"
                                                    placeholder="Enter your name"
                                                    className="input input-bordered w-full bg-white"
                                                />
                                                {errors.name && touched.name ? <div>{errors.name}</div> : null}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap -mx-3 mb-4">
                                            <div className="w-full px-3">
                                                <label className="block text-sm font-medium mb-1" htmlFor="email">
                                                    Email <span className="text-red-600">*</span>
                                                </label>
                                                <Field
                                                    name="email"
                                                    placeholder="Enter your email address"
                                                    className="input input-bordered w-full bg-white"
                                                />
                                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap -mx-3 mb-4">
                                            <div className="w-full px-3">
                                                <label className="block text-sm font-medium mb-1" htmlFor="email">
                                                    Password <span className="text-red-600">*</span>
                                                </label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    className="input input-bordered w-full bg-white"
                                                />
                                                {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                            </div>
                                        </div>

                                        <Button type="submit" fullWidth mt="xl" className="bg-primary">
                                            Sign Up
                                        </Button>

                                        {submissionError && (
                                            <div className="text-red-600 font-medium text-center">{submissionError}</div>
                                        )}

                                        <div className="text-sm text-gray-500 text-center mt-3">
                                            By creating an account, you agree to the{' '}
                                            <a className="underline" href="https://www.akello.io/terms">
                                                terms & conditions
                                            </a>
                                            , and our{' '}
                                            <a className="underline" href="https://www.akello.io/privacy/">
                                                privacy policy
                                            </a>
                                            .
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </Paper>
                </Container>
            </Center>
        </div>
    );
};

export default SignUpPage;
