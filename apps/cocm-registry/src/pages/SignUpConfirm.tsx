import {SignupConfirmationForm} from '@akello/react'
import { useAkello } from '@akello/react-hook'
import { useNavigate } from 'react-router'

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

import * as Yup from "yup";
import {Field, Form, Formik, useFormik} from 'formik';
import {CognitoUser, CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";
import {useState} from "react";
import classes from './LoginPage.module.css';


const SignUpConfirm = () => {    
    const [apierror, setAPIError] = useState('')
    const navigate = useNavigate()
    const akello = useAkello()    
    const email = akello.getUserName()
    
    const EmailCodeSchema = Yup.object().shape({
        code: Yup.string()
            .required('Required')
    });

    return (
        <div className='w-screen'>
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
                            code: ''
                        }}
                        validationSchema={EmailCodeSchema}
                        onSubmit={values => {
                            akello.confirmSignup(email, values.code, (user: any) => {
                                navigate('/')
                            }, (err: any) => {                                    
                                console.log(err)                                    
                                setAPIError(err.message)
                            })                                
                        }}
                    >
                        {({ errors, touched }) => (                                                      
                            <Form className='space-y-4'>                
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="code">Email Code <span className="text-red-600">*</span></label>
                                    <Field name="code" placeholder={"Enter the code"} className="input input-bordered w-full bg-white"/>
                                    {errors.code && touched.code ? (
                                        <div className='text-red-600'>{errors.code}</div>
                                    ) : null}                                                        
                                </div>
                                
                                <div className='space-y-2'>
                                    <Button type={'submit'} className="bg-primary w-full">Confirm code</Button>
                                    <div>
                                        <Button className="btn-secondary w-full" onClick={() => {                                
                                            akello.resendCode(email, (user: any) => {                                    
                                                console.log(user)
                                            }, (err: any) => {                                    
                                                console.log(err)
                                                setAPIError(err.message)
                                            })
                                        }}>Resend code</Button>
                                        { apierror && (
                                            <div className={"text-red-600 text-center "}>{apierror}</div>
                                        )}
                                    </div>
                                    
                                </div>
                                    
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Center>
      </div>
    )
}

export default SignUpConfirm