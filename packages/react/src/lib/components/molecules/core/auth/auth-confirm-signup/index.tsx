import * as Yup from "yup";
import {Field, Form, Formik, useFormik} from 'formik';
import {CognitoUser, CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";
import {useState} from "react";
import {useAkello} from "@akello/react-hook";

export interface SignupConfirmationFormProps  {
    email: string
    onSuccess?: () => void
    onFail?: () => void
}

export const SignupConfirmationForm:React.FC<SignupConfirmationFormProps> = ({email, onSuccess, onFail}) => {    
    const [apierror, setAPIError] = useState('')
    const akello = useAkello()    

    const EmailCodeSchema = Yup.object().shape({
        code: Yup.string()
            .required('Required')
    });

    return (
        <section className="">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1 mb-4">Let's confirm your email</h1>
                        <p className="text-xl">We sent you a code to your email. Enter it below.</p>
                    </div>

                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        <Formik
                            initialValues={{
                                code: ''
                            }}
                            validationSchema={EmailCodeSchema}
                            onSubmit={values => {
                                akello.confirmSignup(email, values.code, (user: any) => {                                                                                                
                                    onSuccess && onSuccess()
                                }, (err: any) => {                                    
                                    onFail && onFail()
                                })                                
                            }}
                        >
                            {({ errors, touched }) => (
                                <div>
                                    <Form className="space-y-4">
                                        <label className="block text-sm font-medium mb-1" htmlFor="code">Email Code <span className="text-red-600">*</span></label>
                                        <Field name="code" placeholder={"Enter the code"} className="input input-bordered w-full"/>
                                        {errors.code && touched.code ? (
                                            <div>{errors.code}</div>
                                        ) : null}
                                        <div className="flex flex-wrap -mx-3 mt-6 space-y-2">
                                            <div className="w-full px-3">
                                                <button type={'submit'} className="btn btn-primary w-full">Confirm code</button>
                                            </div>
                                        </div>
                                        { apierror && (
                                            <div className={"text-red-600 text-center "}>{apierror}</div>
                                        )}
                                    </Form>
                                </div>
                                )}
                        </Formik>
                        <div className="w-full pt-2 text-center">
                            <button className="btn btn-secondary w-full" onClick={() => {
                                //resendCode(email!)
                                akello.resendCode(email, (user: any) => {
                                }, (err: any) => {                                                                        
                                })
                            }}>Resend code</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}