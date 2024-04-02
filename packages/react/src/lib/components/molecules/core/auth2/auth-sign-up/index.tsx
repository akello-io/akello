import { useState } from 'react';
import { Anchor, Paper, Image, Title, Text, Container, Button, Center } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import { IconArrowRight } from '@tabler/icons-react';

import * as Yup from 'yup';
import { useAkello } from '@akello/react-hook';
// import AkelloLogo from '../../../../../assets/images/logos/akello/akello-logo.png';


const SignupSchema = Yup.object().shape({
    first_name: Yup.string().required('Required').min(2, 'Too Short!').max(50, 'Too Long!'),
    last_name: Yup.string().required('Required').min(2, 'Too Short!').max(50, 'Too Long!'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});



const handleOnKeyDown = (e: any) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}


interface SignUpPageProps {
    onLoginClick: () => void;
    onSignupSuccess: () => void;
}


export const SignUpPageComponent:React.FC<SignUpPageProps> = ({onLoginClick, onSignupSuccess}) => {
    const [submissionError, setSubmissionError] = useState('');
    const akello = useAkello();

    return (
        <div className="w-screen">
            <Center>
                <Container size={420} my={40}>
                    <Title ta="center">
                        {/*
                        <Image src={AkelloLogo} alt="Akello Logo" />
                        */}

                        <Text mt={12} size={"xs"} fw={700}>
                            Start for free

                            <IconArrowRight size={20} className="inline-block ml-2" />

                            No Credit Card Required

                            <IconArrowRight size={20} className="inline-block ml-2" />

                            Cancel Anytime

                        </Text>

                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Already have an account?{' '}
                        <Anchor size="sm" component="button" onClick={() => onLoginClick()}>
                            Sign in
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Formik
                            initialValues={{
                                first_name: '',
                                last_name: '',
                                email: '',
                                password: ''
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={values => {
                                akello.signup(values.first_name, values.last_name, values.email, values.password, (user: any) => {
                                    akello.setUserName(values.email);
                                    //navigate('/signup/confirm');
                                    onSignupSuccess();
                                }, (err: any) => {
                                    console.log(err)
                                    setSubmissionError(err.message);
                                });
                            }}
                        >
                            {({ errors, touched }) => (
                                <div>
                                    <Form className="space-y-4">
                                        <div className="flex flex-wrap -mx-3 mb-4">
                                            <div className="w-full px-3">
                                                <label className="block text-sm font-medium mb-1" htmlFor="first_name">
                                                    First Name <span className="text-red-600">*</span>
                                                </label>
                                                <Field
                                                    name="first_name"
                                                    placeholder="Enter your first name"
                                                    className="input input-bordered w-full bg-white"
                                                    onKeyDown={handleOnKeyDown}
                                                />
                                                {errors.first_name && touched.first_name ? <div>{errors.first_name}</div> : null}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-4">
                                            <div className="w-full px-3">
                                                <label className="block text-sm font-medium mb-1" htmlFor="last_name">
                                                    Last Name <span className="text-red-600">*</span>
                                                </label>
                                                <Field
                                                    name="last_name"
                                                    placeholder="Enter your last name"
                                                    className="input input-bordered w-full bg-white"
                                                    onKeyDown={handleOnKeyDown}
                                                />
                                                {errors.last_name && touched.last_name ? <div>{errors.last_name}</div> : null}
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
                                                    onKeyDown={handleOnKeyDown}
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
                                                    onKeyDown={handleOnKeyDown}
                                                />
                                                {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                            </div>
                                        </div>

                                        <Button type="submit" fullWidth mt="xl">
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
