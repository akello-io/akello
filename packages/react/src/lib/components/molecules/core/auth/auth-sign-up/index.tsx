import {Field, Form, Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from "react";
import { useAkello, useAkelloContext } from "@akello/react-hook"

const SignupSchema = Yup.object().shape({
  name: Yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
  email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  password: Yup.string().required('Required')
});

export interface SignUpFormProps {
    onSuccess?: () => void
    onFail?: () => void
    onSiginClick: () => void
}

export const SignUpForm:React.FC<SignUpFormProps> = ({onSuccess, onFail, onSiginClick}) => {        
    const [submissionError, setSubmissionError] = useState('')

    const akelloContext = useAkelloContext()
    const akello = useAkello()

    return (
        <section className="">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="text-2xl">Welcome. </h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
                <Formik
                    initialValues={{
                    name: '',
                    email: '',
                    password: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        akello.signup(values.email, values.password, (user: any) => {
                            debugger;
                            console.log(user)
                            onSuccess && onSuccess()
                            
                        }, (err: any) => {
                            debugger;
                            console.log(err)
                            onFail && onFail()
                        })                        
                    }}
                >
                {({ errors, touched }) => (
                    <div>
                        <Form className="space-y-4">
                            <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-red-600">*</span></label>
                                <Field name="name" placeholder={"Enter your name"} className="input input-bordered w-full"/>
                                {errors.name && touched.name ? (
                                    <div>{errors.name}</div>
                                ) : null}
                            </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                                <Field name="email" placeholder={"Enter your email address"} className="input input-bordered w-full"/>
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                            </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block  text-sm font-medium mb-1" htmlFor="email">Password <span className="text-red-600">*</span></label>
                                <Field type="password" name="password" placeholder={"Enter your password"} className="input input-bordered w-full"/>
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null}
                            </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mt-6">
                            <div className="w-full px-3">
                                <button type={'submit'} className="btn btn-primary w-full">Sign up</button>
                            </div>
                            </div>
                            {submissionError && (
                                <div className={"text-red-600 font-medium text-center"}>
                                    {submissionError}
                                </div>
                            )}

                            <div className="text-sm text-gray-500 text-center mt-3">
                            By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
                            </div>
                        </Form>
                    </div>
                )}
                </Formik>
                <div className="text-gray-600 text-center mt-6">
                Already using Akello.io? <button onClick={() => onSiginClick()}  className="text-blue-600 hover:underline transition duration-150 ease-in-out ">Sign in</button>
                </div>
            </div>

            </div>
        </div>
        </section>
    )
}