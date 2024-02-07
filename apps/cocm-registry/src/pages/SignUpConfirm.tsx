import { useAkello } from '@akello/react-hook';
import { useNavigate } from 'react-router';
import { Paper, Title, Text, Container, Button, Center } from '@mantine/core';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import classes from './LoginPage.module.css';

const SignUpConfirm = () => {
    const [apierror, setAPIError] = useState('');
    const navigate = useNavigate();
    const akello = useAkello();
    const email = akello.getUserName();

    const EmailCodeSchema = Yup.object().shape({
        code: Yup.string().required('Required'),
    });

    const handleFormSubmit = (values: { code: string }) => {
        akello.confirmSignup(
            email,
            values.code,
            (user: any) => {
                navigate('/');
            },
            (err: any) => {
                console.log(err);
                setAPIError(err.message);
            }
        );
    };

    const handleResendCode = () => {
        akello.resendCode(
            email,
            (user: any) => {
                console.log(user);
            },
            (err: any) => {
                console.log(err);
                setAPIError(err.message);
            }
        );
    };

    return (
        <div className="w-screen">
            <Center>
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        Confirm your email
                    </Title>
                    <Text ta="center" className={classes.subtitle}>
                        We sent you a code to your email. Enter it below.
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Formik
                            initialValues={{
                                code: '',
                            }}
                            validationSchema={EmailCodeSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="code">
                                            Email Code <span className="text-red-600">*</span>
                                        </label>
                                        <Field
                                            name="code"
                                            placeholder="Enter the code"
                                            className="input input-bordered w-full bg-white"
                                        />
                                        {errors.code && touched.code ? (
                                            <div className="text-red-600">{errors.code}</div>
                                        ) : null}
                                    </div>

                                    <div className="space-y-2">
                                        <Button type="submit" className="bg-primary w-full">
                                            Confirm code
                                        </Button>
                                        <div>
                                            <Button className="btn-secondary w-full" onClick={handleResendCode}>
                                                Resend code
                                            </Button>
                                            {apierror && <div className="text-red-600 text-center ">{apierror}</div>}
                                        </div>
                                    </div>

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
                            )}
                        </Formik>
                    </Paper>
                </Container>
            </Center>
        </div>
    );
};

export default SignUpConfirm;
